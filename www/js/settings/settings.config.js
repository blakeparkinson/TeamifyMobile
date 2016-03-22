angular.module('app.settings')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.settings', {

                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'js/settings/settings.html',
                        controller: 'SettingsController as settings'
                    }
                }
            });

    });