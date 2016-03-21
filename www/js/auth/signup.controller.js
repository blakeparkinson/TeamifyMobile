(function() {
    'use strict';

    angular
        .module('auth')
        .controller('SignupController', function SignupController($log, accountsResource, authenticate) {
        /*jshint validthis: true */
        var vm = this;

            vm.user = {};

            vm.doSignUp = function(){
                //@tmf validate
               accountsResource.create(vm.user).then(function(success){
                    authenticate.login(success.email, success.password);
                },
               function(err){
                   $log.log(err);
               });
            };

    })
})();

