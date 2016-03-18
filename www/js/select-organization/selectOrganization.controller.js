(function () {
    'use strict';


    angular.module('app.selectOrganization')
        .controller('SelectOrganization', function MessagesController( $ionicBackdrop, $scope, $log, $http, baseApiUrl, $ionicPopup, $timeout, organizationsResource) {
            var vm = this;
            vm.pendingOrganizations = [];

           $scope.showConfirm = function(item) {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Request Invite?',
                    template: 'Once the manager approves your request you will be added to this organization'
                });
               $ionicBackdrop.retain();
                confirmPopup.then(function(res) {
                    if(res) {

                        organizationsResource.save(item._id).then(function(success){
                            $log.log(success);
                            vm.pendingOrganizations.push(item);
                        },
                        function(err){
                            $log.error(err);
                        })

                    }
                });


            };


            vm.clickedMethod = function (callback) {

                $scope.showConfirm(callback.item);

            }
// inside your controller you can define the 'clickButton()' method the following way
            vm.clickButton = function () {
                var ionAutocompleteElement = document.getElementsByClassName("ion-autocomplete");
                angular.element(ionAutocompleteElement).controller('ionAutocomplete').fetchSearchQuery("", true);
                angular.element(ionAutocompleteElement).controller('ionAutocomplete').showModal();
            }
           vm.callbackMethod = function (query, isInitializing) {
               if (isInitializing) {
                   // depends on the configuration of the `items-method-value-key` (items) and the `item-value-key` (name) and `item-view-value-key` (name)
                   return {items: []}
               } else {
                   return $http.get(baseApiUrl + '/api/organizations/search?name=' + query);
               }
           }




    });

})();