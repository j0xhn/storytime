window.storytimeAngularApp = angular.module('storytime', [
  'ngRoute',
  'ui.tinymce',
  'angularModalService',
  'filters',
  'services',
  'directives'
]);
angular.module('filters',[]);
angular.module('services',[]);
angular.module('directives',[]);
angular.module('storytime').config(function ($routeProvider, $locationProvider) {

  /*
    use target="_self" in href to trigger a whole page reload
    and hence the ability for express to handle route
  */

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
  .when('/checkout',  { template: '<checkout-page></checkout-page>' })
  .when('/landing',  { template: '<landing></landing>' })
  .when('/story/:storyId', {
    template: '<story-page></story-page>',
    resolve:{
      hasPurchasedStory:function($location, $route, $q, userService){
        var storyId = $route.current.params.storyId;
        var deferred = $q.defer();
        if(userService.hasPurchased(storyId) || storyId === 'example'){
          deferred.resolve(true)
        }else{
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
    // removes side nav and lock screen on navigation
    window.navigation.toggleSideNav(false);
  });
});
