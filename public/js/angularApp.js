angular.module('storytime', [
  'ngRoute',
  'ui.tinymce',
  'filters',
  'services',
  'directives'
]);
angular.module('filters',[]);
angular.module('services',[]);
angular.module('directives',[]);
angular.module('storytime').config(function ($routeProvider, $locationProvider) {
  // use the HTML5 History API
  // use target="_self" in href to trigger a whole page reload
  // and hence the ability for express to handle route
  // debugger;
  // var user;
  // userService.getCurrentUser().then(function(res){
  //   user = res.data;
  // });
  $locationProvider.html5Mode(true);
  $routeProvider
  .when('/_=_', {redirectTo: '/'}) // facebook ugliness
  .when('/',        {
    template: '<feed></feed>',
    resolve:{
      user: function($q, $location, userService){
        var deferred = $q.defer();
        if (userService.isLoggedIn()){
          deferred.resolve(true);
        } else {
          console.log('user is not logged in, redirecting');
          $location.path('/landing').replace();
        }
        return deferred.promise;
      }
    }
  })
  .when('/stories', { template: '<feed></feed>' })
  .when('/success/:type?', { template: '<success-page></success-page>' })
  .when('/submit/:storyId?',  {
    template: '<story-submit></story-submit>',
    resolve: {
      user: function($q, $window, userService){
        var deferred = $q.defer();
        if (userService.isLoggedIn()){
          deferred.resolve(true);
        } else {
          $window.location = '/login';
        }
        return deferred.promise;
      }
    }
  })
  .when('/landing',  { template: '<landing></landing>' })
  .when('/story/:storyId', {
    template: '<story-page></story-page>',
    resolve:{
      hasPurchasedStory:function($location, $route, $q, userService){
        var storyId = $route.current.params.storyId;
        var deferred = $q.defer();
        if(userService.user.purchased.includes(storyId) || storyId === 'example'){
          deferred.resolve(true)
        }else{
          // TODO: just swap out these lines for purchase info
          // deferred.resolve(true)
          $location.path('/detail/'+$route.current.params.storyId).replace();
        }
        return deferred.promise;
      }
    }
  })
  .when('/detail/:storyId', { template: '<detail-page></detail-page>' })
  .otherwise({ redirectTo: '/' })
}).run(function ($rootScope, $location, userService) { //Insert in the function definition the dependencies you need.
  $rootScope.$on("$routeChangeStart", function(event, next, current){
    navigation.toggleSideNav(false);
    // checks for facebook ungliness
    if (window.location.hash == '#_=_'){
      console.log("Facebook ugly detected");
      history.replaceState
      ? history.replaceState(null, null, window.location.href.split('#')[0])
      : window.location.hash = '';
    }
  });
});
