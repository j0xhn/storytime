angular.module('storytime', [
  'ngRoute',
  'priceFilter',
  'storiesService',
  'feedCtrl',
  'storyCtrl',
  'storyCardDirective',
  'inputDirective'
]);
angular.module('storytime').config(function ($routeProvider) {
  $routeProvider
  .when('/', {
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
