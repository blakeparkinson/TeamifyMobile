angular.module('auth').controller('AuthController', function($scope, $auth, $state, $http,
                                                             $ionicModal, $rootScope, usersResource, authenticate) {
    var vm = this;
    vm.email = "";
    vm.password = "";

    vm.loading = false;
    vm.login = function() {
        vm.loading = true;
        var credentials = {
            email: vm.email,
            password: vm.password,
            name: vm.name
        };


        $auth.login(credentials).then(
            function (response) {
                // Return an $http request for the now authenticated
                // user so that we can flatten the promise chainf


                // Stringify the returned data to prepare it
                // to go into local storage
                var user = JSON.stringify(response.data.user);

                console.log(response.data.user);
                // Set the stringified user data into local storage
                localStorage.setItem('user', user);

                // The user's authenticated state gets flipped to
                //// true so we can now show parts of the UI that rely
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
                vm.loading = false;
                vm.loginError = "Email or password incorrect."
            });



    };

    $ionicModal.fromTemplateUrl('forgotpassword.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    })

    vm.openModal = function() {
        $scope.modal.show();
    };
    vm.closeModal = function() {
        $scope.modal.hide();
        vm.emailSent =  false;
        vm.resetEmail  = '';
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

    vm.resetEmail = '';
    vm.emailSent =  false;
    vm.sendResetEmail = function(){

        if(vm.resetEmail == ''){
            return;
        }
        vm.loadingEmail = true;
        usersResource.sendResetEmail(vm.resetEmail).then(function(result){
                vm.loadingEmail = false;
            vm.emailSent = true;

        },
        function(error){
            vm.loadingEmail = false;
           // @tmf handle
        })

    };

});