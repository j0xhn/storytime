angular.module('miniApp', [
  'ngRoute',
  'miniApp.landingCtrl',
  'miniApp.services',
  'miniApp.controllers'
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
  .when('/story/:storyId/:storyTitle', {
    templateUrl: 'pages/story/story.html',
    controller: 'StoryCtrl'
  })
});
