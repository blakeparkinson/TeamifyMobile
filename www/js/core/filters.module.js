var core = angular.module('app.core');



core.filter('initials', function () {
    return function (user) {
        var str = user.name.first.charAt(0) + user.name.last.charAt(0);
        return str.toUpperCase();
    };
});

core.filter('moment_dateMedium', function () {
    return function (input) {
        return moment(input).format('ddd, MMM Do YYYY');
    };
});

//