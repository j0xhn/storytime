angular.module('miniApp', ['ngRoute']);
angular.module('miniApp').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/landing/index.html'
        })
        .when('/detailTest', {
            templateUrl: 'views/detailTest.html'
        })
});
