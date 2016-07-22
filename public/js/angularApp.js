angular.module('storytime', [
  'ngRoute',
  'priceFilter',
  'storiesService',
  'feedCtrl',
  'storyCtrl',
  'storyCardDirective',
  'inputDirective'
]);
angular.module('storytime').config(function ($routeProvider, $locationProvider) {
  // use the HTML5 History API
  // $locationProvider.html5Mode(true);
  $routeProvider
  .when('/', {
    templateUrl: 'pages/feed/feed.html',
    controller: 'feedCtrl'
  })
  .when('/stories', {
    templateUrl: 'pages/feed/feed.html',
    controller: 'feedCtrl'
  })
  .when('/detailTest', {
    templateUrl: 'partials/detailTest.html'
  })
  .when('/story/:storyId/:storyTitle', {
    templateUrl: 'pages/story/story.html',
    controller: 'StoryCtrl'
  })
});
