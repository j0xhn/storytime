angular.module('storytime', [
  'ngRoute',
  'ui.tinymce',
  'filters',
  'services',
  'controllers',
  'directives'
]);
angular.module('filters',[]);
angular.module('services',[]);
angular.module('controllers',[]);
angular.module('directives',[]);
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
    controller: 'StoryCtrl',
    resolve:{
      "hasPurchasedStory":function($location, $route, userService){
        userService.getCurrentUser().then(function(res){
          if( res.data.purchased.includes($route.current.params.storyId)){
            // continue onto story
            console.log('has purchased')
            return true;
          }else{
            //redirect user to detail landing page.
            console.log('has not purchased');
            $location.path('/detail/'+$route.current.params.storyId);
          }
        });
      }
    }
  })
  .when('/detail/:storyId', {
    templateUrl: 'pages/detail/detail.html',
    controller: 'DetailCtrl'
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

var checkForPurchase = function (storyId) {
    // check user for if they've purchased
    console.log('checking user for purchased story')
    return false
}
