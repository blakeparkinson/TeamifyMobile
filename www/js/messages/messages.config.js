
angular.module('app.messages')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.messages', {

                url: '/messages',
                views: {
                    'menuContent': {
                        templateUrl: 'js/messages/messages.html'
                    }
                }
            });

    }); //