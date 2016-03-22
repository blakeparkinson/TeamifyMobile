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
        authenticate.login(vm.email, vm.password);

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