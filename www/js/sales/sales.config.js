
angular.module('app.sales')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.sales', {

                url: '/sales',
                views: {
                    'menuContent': {
                        templateUrl: 'js/sales/sales.html',
                        controller: 'SalesController as sales'
                    }
                }
            });

    }); //