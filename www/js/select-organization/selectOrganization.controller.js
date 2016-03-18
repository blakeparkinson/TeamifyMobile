(function () {
    'use strict';


    angular.module('app.selectOrganization')
        .controller('SelectOrganization', function MessagesController($log, $http, baseApiUrl, organizationsResource) {
        var vm = this;
            vm.activeOrganizations = [];
            vm.clickedMethod = function (callback) {

                vm.activeOrganizations.push(callback.item);

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