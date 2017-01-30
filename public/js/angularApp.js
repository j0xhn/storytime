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
  var ifLoggedIn = function(directiveName, redirectPath) {
    return {
      template: '<'+directiveName+'></'+directiveName+'>',
      resolve:{
        user: function($q, $location, userService){
          var deferred = $q.defer();
          if (userService.isLoggedIn()){
            deferred.resolve(true);
          } else {
            console.log('user is not logged in, redirecting to ', redirectPath);
            var excludePaths = ['/login']; // paths that are not part of angular routes
            if(excludePaths.includes(redirectPath)){
              window.location.pathname = redirectPath;
            } else {
              $location.path(redirectPath).replace();
            }
          }
          return deferred.promise;
        }
      }
    }
  }

  var ifAdmin = function(directiveName, redirectPath) {
    return {
      template: '<'+directiveName+'></'+directiveName+'>',
      resolve:{
        user: function($q, $location, userService){
          var deferred = $q.defer();
          if (userService.isAdmin()){
            deferred.resolve(true);
          } else {
            console.log('user is not admin, redirecting to ', redirectPath);
            var excludePaths = ['/login']; // paths that are not part of angular routes
            if(excludePaths.includes(redirectPath)){
              window.location.pathname = redirectPath;
            } else {
              $location.path(redirectPath).replace();
            }
          }
          return deferred.promise;
        }
      }
    }
  }

  $locationProvider.html5Mode(true);
  $routeProvider
  .when('/_=_', {redirectTo: '/'}) // facebook ugliness
  .when('/', ifLoggedIn('feed', '/landing'))
  .when('/stories', { template: '<feed></feed>' })
  .when('/myStories', ifLoggedIn('my-stories', '/login'))
  .when('/privacy', { template: '<privacy-page></privacy-page>' })
  .when('/terms', { template: '<terms-page></terms-page>' })
  .when('/success/:type?', { template: '<success-page></success-page>' })
  .when('/submit/:storyId?', ifLoggedIn('story-submit', '/login'))
  .when('/checkout',  { template: '<checkout-page></checkout-page>' })
  .when('/landing',  { template: '<landing></landing>' })
  .when('/story/:storyId', {
    template: '<story-page></story-page>',
    resolve:{
      hasPurchasedStory:function($location, $route, $q, userService){
        var storyId = $route.current.params.storyId;
        var deferred = $q.defer();
        var hasPurchased = userService.hasPurchased(storyId) || storyId === 'example';
        if(hasPurchased){
          deferred.resolve(true)
        }else{
          $location.path('/detail/'+$route.current.params.storyId).replace();
        }
        return deferred.promise;
      }
    }
  })
  .when('/detail/:storyId', { template: '<detail-page></detail-page>' })
  // ADMIN
  .when('/purchases/', ifAdmin('admin-payments-page', '/'))
  .otherwise({ redirectTo: '/' })
}).run(function ($rootScope, $location, userService) { //Insert in the function definition the dependencies you need.
  $rootScope.$on("$routeChangeStart", function(event, next, current){
    // removes side nav and lock screen on navigation
    window.navigation.toggleSideNav(false);
  });
});
