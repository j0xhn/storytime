angular.module('storytime', [
  'ngRoute',
  'priceFilter',
  'storiesService',
  'userService',
  'feedCtrl',
  'storyCtrl',
  'storySubmitCtrl',
  'storyCardDirective',
  'inputDirective',
  'textAreaDirective'
]);
angular.module('storytime').config(function ($routeProvider, $locationProvider) {
  // use the HTML5 History API
  // use target="_self" in href to trigger a whole page reload
  // and hence the ability for express to handle route
  $locationProvider.html5Mode(true);
  $routeProvider
  .when('/', {
    templateUrl: 'pages/feed/feed.html',
    controller: 'feedCtrl'
  })
  .when('/stories', {
    templateUrl: 'pages/feed/feed.html',
    controller: 'feedCtrl'
  })
  .when('/submit', {
    templateUrl: 'pages/submit/submit.html',
    controller: 'storySubmitCtrl'
  })
  .when('/story/:storyId/:storyTitle', {
    templateUrl: 'pages/story/story.html',
    controller: 'StoryCtrl'
  })
  .when('/users', {
    templateUrl: '',
    controller:''
  })
}).run(function ($rootScope, $location) { //Insert in the function definition the dependencies you need.
  //Do your $on in here, like this:
  $rootScope.$on("$locationChangeStart", function(event, next, current){
      //Do your things
  })
});
