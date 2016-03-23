(function () {
    'use strict';
    var module = angular.module('app.sales');
    /* globals angular */
    module.controller('SalesController',function SalesController($log, organizationsResource, ionicDatePicker, $scope, $ionicPopup) {
    var vm = this;
    vm.singleDayMode = true;

        vm.dateOverlap = function(){
                var confirmPopup = $ionicPopup.alert({
                    title: 'Date Overlap',
                    template: 'Start date and end date must not overlap!'
                });

                confirmPopup.then(function(res) {
                    if(res) {

                    }
                });
            };


        vm.date = {
            from: moment(),
            to: moment()
        };
        var ipObj1 = {
            callback: function (val) {
                var m = moment(val);
                if(m.isAfter(vm.date.to, 'day')){
                    vm.dateOverlap();
                    return;
                }
                if(m.isSame(vm.date.to,'day')){
                    vm.singleDayMode = true;
                }
                else{
                    vm.singleDayMode = false;
                }
                vm.date.from = moment(val);


               // console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            },

            closeLabel: 'Cancel',
            mondayFirst: false,
            closeOnSelect: true,       //Optional
            templateType: 'popup'       //Optional
        };

        vm.fromDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };


        var ipObj2 = {
            callback: function (val) {  //Mandatory


                var m = moment(val);
                if(m.isBefore(vm.date.from, 'day')){
                    vm.dateOverlap();
                    return;
                }
                if(m.isSame(vm.date.to,'day')){
                    vm.singleDayMode = true;
                }
                else{
                    vm.singleDayMode = false;
                }
                vm.date.to =  moment(val);
                fetchSales();

            },
            closeLabel: 'Cancel',
            mondayFirst: false,
            closeOnSelect: true       //Optional
        };

        vm.toDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj2);
        };

        function fetchSales(val){
            organizationsResource.projection(vm.date.from, vm.date.to).then(function(success){
                console.log(success);
                vm.projection = success.projection;
            });
        }




    });


})();