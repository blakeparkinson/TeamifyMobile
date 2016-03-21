(function () {
    'use strict';

    angular.module('app.core').factory(
        'authenticate', function($auth, $rootScope, $log, $state) {


        var factory = {};

            factory.login = function(email, password){

                var credentials = {
                    email: email,
                    password: password
                };

                $auth.login(credentials).then(
                function (response) {
                    // Return an $http request for the now authenticated
                    // user so that we can flatten the promise chainf


                    // Stringify the returned data to prepare it
                    // to go into local storage
                    var user = JSON.stringify(response.data.user);

                    // Set the stringified user data into local storage
                    localStorage.setItem('user', user);

                    // The user's authenticated state gets flipped to
                    // true so we can now show parts of the UI that rely
                    // on the user being logged in
                    $rootScope.authenticated = true;

                    // Putting the user's data on $rootScope allows
                    // us to access it anywhere across the app
                    $rootScope.currentUser = response.data.user;


                    // Everything worked out so we can now redirect to
                    // the users state to view the data
                    if (response.data.user.organizations.length > 0) {
                        $rootScope.activeOrganization = response.data.user.organizations[0];
                        $state.go('app.messages');
                    } else {
                        $state.go('app.selectOrganization');
                    }


                    // Handle errors
                }, function (error) {

                        //@tmf handle
                   $log.log(error);

                });


            };



        return factory;

    });
})();
