(function () {
    'use strict';

    angular.module('app.core').factory(
        'accountsResource', function($resource, baseApiUrl, $rootScope) {

        var factory = {};

        function buildResource(subpath) {
            return $resource(
                baseApiUrl + '/api/accounts' + subpath, {}, {
                    update: {
                        method: 'PUT'
                    }
                });
        }

        factory.create = function(account){
                           var resource = buildResource('');
                           return resource.save({account: account}).$promise;
                       };

            factory.pendingInvitations = function(){
                var resource = buildResource('/:_id/pendinginvitations');
                return resource.query({_id:$rootScope.currentUser._id}).$promise;
            };

        return factory;

    });
})();
