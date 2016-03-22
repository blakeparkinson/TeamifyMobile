(function() {
    'use strict';

    angular
        .module('auth')
        .controller('SignupController', function SignupController($animate, $log, $scope, accountsResource, authenticate) {
        /*jshint validthis: true */
        var vm = this;



            vm.loading = false;
            vm.doSignUp = function(){


                if (vm.form.$invalid) {
                    var element = angular.element(document.getElementById('signupForm'));
                    $animate.addClass(element, 'shake').then(function() {
                        element.removeClass('shake');
                    });
                        return;
                    }

                vm.loading = true;

                accountsResource.create(vm.form.user).then(function(success){
                 vm.loading = false;
                    authenticate.login(success.email, success.password);
                },

               function(err){
                   vm.loading = false;
                   vm.loginError = "An account with this email already exists!";
                   $log.log(err);
               });

            };

    });
})();

