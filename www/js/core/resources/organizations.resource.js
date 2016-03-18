(function () {
    'use strict';

    angular.module('app.core').factory(
        'organizationsResource', organizationsResource);

    /* @ngInject */
    function organizationsResource($resource, baseApiUrl) {

        var factory = {};

        function buildResource(subpath) {
            return $resource(
                baseApiUrl + '/api/organizations' + subpath, {}, {
                    update: {
                        method: 'PUT'
                    }
                });
        }

        factory.search = function (query) {
            var resource = buildResource('/search');
            return resource.query({name: query}).$promise;
        };

        return factory;

    }
})();
//