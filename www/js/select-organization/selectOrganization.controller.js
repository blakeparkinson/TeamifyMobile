(function () {
    'use strict';


    angular.module('app.selectOrganization')
        .controller('SelectOrganization', function MessagesController($scope, $log, $http, baseApiUrl, $ionicPopup, $timeout, organizationsResource) {
        var vm = this;
            vm.pendingOrganizations = [];

            $scope.showConfirm = function() {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Consume Ice Cream',
                    template: 'Are you sure you want to eat this ice cream?'
                });

                confirmPopup.then(function(res) {
                    if(res) {
                        console.log('You are sure');
                    } else {
                        console.log('You are not sure');
                    }
                });
            };


$scope.showConfirm();
            vm.clickedMethod = function (callback) {





                vm.pendingOrganizations.push(callback.item);


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