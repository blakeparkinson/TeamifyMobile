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

         factory.projection = function(fromDate, toDate){
             console.log('er');
                         var resource = buildResource('/:_id/projection');
                         return resource.jsonQuery({_id: $rootScope.activeOrganization},
                             {from: fromDate, to: toDate}).$promise;
                     };



        return factory;

    }
})();
//