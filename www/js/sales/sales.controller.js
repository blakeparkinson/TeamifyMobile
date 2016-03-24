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


        //initialize projections with today
        fetchProjections();

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
                fetchProjections();

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


        vm.editProjection = function(projection){

            $scope.data = {};
            $scope.data.projection = projection;
            $scope.data.default = false;
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show(
                {
                    template: '<div style="margin-bottom:10px"><input type="text" ng-model="data.projection"></div>' +
                    '<div  style="display:inline-block; margin-left:10px;"> <input ng-model="data.default" type="checkbox" style="width:20px; height:20px; position:relative; top:6px;" id="c"></div> <div style="display:inline-block; margin-left:0px;"><label  for="c">Make default (every ' + vm.date.from.format('dddd') + ')</label> </div>',
                    title: vm.date.from.format('ddd MMM D'),
                    subTitle: 'Enter New Projection',
                    scope: $scope,
                    buttons: [{text: 'Cancel'},
                        {
                            text: '<b>Save</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                if ($scope.data.projection && !isNaN($scope.data.projection)) {
                                    vm.projection = $scope.data.projection;
                                    if($scope.data.default){
                                       organizationsResource.updateDefaultProjection(vm.date.from.format('d'),$scope.data.projection)
                                    }

                                        organizationsResource.createCustomProjection($scope.data.projection, vm.date.from);
                                

                                }
                            }
                        }]

        });

        };

        var ipObj2 = {
            callback: function (val) {  //Mandatory


                var m = moment(val);
                if(m.isBefore(vm.date.from, 'day')){
                    vm.dateOverlap();
                    return;
                }
                if(m.isSame(vm.date.from,'day')){
                    vm.singleDayMode = true;
                }
                else{
                    vm.singleDayMode = false;
                }
                vm.date.to =  moment(val);
                fetchProjections();

            },
            closeLabel: 'Cancel',
            mondayFirst: false,
            closeOnSelect: true       //Optional
        };

        vm.toDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj2);
        };

        function fetchProjections(val){
            organizationsResource.projection(vm.date.from, vm.date.to).then(function(success){
                console.log(success);
                vm.projection = success.projection;
            });
        }




    });


})();