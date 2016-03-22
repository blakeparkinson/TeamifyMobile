angular.module('auth').config(function($stateProvider) {

    $stateProvider.state('auth.signup', {
        url: '/signup',
        views: {
            "test": {
                templateUrl: "js/auth/signup.html",
                controller: 'SignupController as signup'
            }
        }
    });

});
