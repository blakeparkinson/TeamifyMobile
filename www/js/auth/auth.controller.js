angular.module('auth').controller('AuthController', function($scope, $auth, $state, $http, $rootScope, $q, $timeout) {
    var vm = this;
    vm.email = "";
    vm.password = "";

    vm.loading = true;
    vm.login = function() {
        vm.loading = true;
        var credentials = {
            email: vm.email,
            password: vm.password,
            name: vm.name
        };

       $auth.login(credentials).then(function(response) {
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


           vm.loading = false;
            // Everything worked out so we can now redirect to
            // the users state to view the data
            $state.go('tab.dash');

            // Handle errors
        }, function(error) {
            vm.loading = false;
            vm.loginError = true;
            vm.loginErrorText = error.data.error;
            // Because we returned the $http.get request in the $auth.login
            // promise, we can chain the next promise to the end here
        });
    };



});