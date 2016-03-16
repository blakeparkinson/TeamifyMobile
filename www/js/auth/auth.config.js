angular.module('auth').config(function($stateProvider, $authProvider, baseApiUrl) {

    $authProvider.loginUrl = baseApiUrl + '/api/authenticate';

    $stateProvider.state('auth', {
        url: '/auth',
        templateUrl:"js/auth/auth.html",
        controller:'AuthController as auth'
    })
        .state('logout', {
            url: '/logout',
            controller: function($scope,$auth,$rootScope,$state) {

                $auth.logout().then(function() {

                    // Remove the authenticated user from local storage
                    localStorage.removeItem('user');

                    // Flip authenticated to false so that we no longer
                    // show UI elements dependant on the user being logged in
                    $rootScope.authenticated = false;

                    // Remove the current user info from rootscope
                    $rootScope.currentUser = null;

                    $state.go('auth');
                });
            }
        });

});

