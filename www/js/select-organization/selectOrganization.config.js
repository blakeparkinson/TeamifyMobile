
angular.module('app.selectOrganization')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.selectOrganization', {

                url: '/selectorganization',
                views: {
                    'menuContent': {
                        templateUrl: 'js/select-organization/select.html',
                        controller: 'SelectOrganization as selectOrganization'
                    }
                }
            });

    });