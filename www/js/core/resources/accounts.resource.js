(function () {
    'use strict';

    angular.module('app.core').factory(
        'accountsResource', function($resource, baseApiUrl) {

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

        return factory;

    });
})();
