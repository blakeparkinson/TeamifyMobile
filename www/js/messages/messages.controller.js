(function () {
    'use strict';
    var module = angular.module('app.messages');
    /* globals angular */
    module.controller('MessagesController', MessagesController);


    MessagesController.$inject = [];

    function MessagesController($log) {
        $log.log('here');
    }


})();