(function () {
    'use strict';

    angular.module('app.core').factory(
        'organizationsResource', organizationsResource);

    /* @ngInject */
    function organizationsResource($resource, baseApiUrl, $rootScope) {

        var factory = {};

        function buildResource(subpath) {
            return $resource(
                baseApiUrl + '/api/organizations' + subpath, {}, {
                    update: {
                        method: 'PUT'
                    },
                    jsonQuery: {
                        method: 'GET',
                        isArray: false
                    }
                });
        }

        factory.search = function (query) {
            var resource = buildResource('/search');
            return resource.query({name: query}).$promise;
        };

        factory.save = function(organizationId) {
            var resource = buildResource('/:_id/adduser');
            return resource.save({_id:organizationId},{userId: $rootScope.currentUser._id}).$promise;
        };
        factory.requestInvite = function(organizationId) {
            var resource = buildResource('/:_id/requestinvite');
            return resource.save({_id:organizationId},{userId: $rootScope.currentUser._id}).$promise;
        };

        factory.updateDefaultProjection = function(dow, projection){
            var resource = buildResource('/:_id/defaultprojection/:dow',
                {});
            return resource.update({
                _id: $rootScope.activeOrganization._id,
                dow: dow
            },{projection: projection}).$promise;
        };

        factory.createCustomProjection = function(projection, date){

            var payload = {projection: projection, date: date, labor: {hours: 0, wages:0}, sales:0};
            var resource = buildResource('/:_id/customprojection',
                {});
            return resource.save(
                {_id: $rootScope.activeOrganization._id},
                {projection: payload}).$promise;
        };

         factory.projection = function(fromDate, toDate){

                         var resource = buildResource('/:_id/projection');
                         return resource.jsonQuery({_id: $rootScope.activeOrganization._id,
             from: moment(fromDate).toDate(), to: moment(toDate).toDate()}).$promise;
                     };



        return factory;

    }
})();
//