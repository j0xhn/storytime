angular.module('miniApp', [
  'ngRoute',
  'miniApp.landingCtrl',
  'miniApp.services'
]);
angular.module('miniApp').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/landing/index.html',
            controller: 'LandingCtrl'
        })
        .when('/detailTest', {
            templateUrl: 'views/detailTest.html'
        })
});
