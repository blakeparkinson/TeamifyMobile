(function () {
    'use strict';

    angular.module('app.core').factory(
        'usersResource', usersResource);

    /* @ngInject */
    function usersResource($resource, baseApiUrl) {

        var factory = {};

        function buildResource(subpath) {
            return $resource(
                baseApiUrl + 'api/users' + subpath, {}, {
                    update: {
                        method: 'PUT'
                    }
                });
        }

        factory.sendResetEmail = function (email) {
            console.log("url:" + baseApiUrl);
            var resource = $resource(baseApiUrl + '/api/authenticate/forgot',{},{ reset:{
                method: 'POST',
                isArray: false
            }});
            return resource.reset({},{email: email}).$promise;
        };

        factory.resetPassword = function (token, password) {
            var resource = $resource(baseApiUrl + 'authenticate/reset/:token',{},{ reset:{
                method: 'POST',
                isArray: false
            }});
            return resource.reset({token: token},{password: password}).$promise;
        };


        factory.getActiveUsers = function () {
            var resource = buildResource('/active');
            return resource.query({}).$promise;
        };

        factory.getUsers = function () {


        };

        factory.create = function (user) {
            var resource = buildResource('');
            return resource.save(user).$promise;
        };

        factory.update = function (user) {
            var resource = buildResource('/:_id');
            return resource.update({_id: user._id}, user).$promise;
        };

        factory.getFile = function (userId) {
            var resource = buildResource('/:_id/file');
            return resource.query({_id: userId}).$promise;
        };

        return factory;

    }
})();
