angular.module('miniApp', ['ngRoute']);
angular.module('miniApp').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/test.html'
        })
        .when('/detailTest', {
            templateUrl: 'views/detailTest.html'
        })
});
