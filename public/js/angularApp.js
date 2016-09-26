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
  .when('/',        {
    template: '<feed></feed>',
    resolve:{
      user: function($q, $location, userService){
        var deferred = $q.defer();
        if (!(userService.user.type === 'guest')){
          deferred.resolve(true);
        } else {
          $location.path('/landing').replace();
        }
        return deferred.promise;
      }
    }
  })
  .when('/stories', { template: '<feed></feed>' })
  .when('/submit',  { template: '<story-submit></story-submit>' })
  .when('/landing',  { template: '<landing></landing>' })
  .when('/story/:storyId/:storyTitle?', {
    template: '<story-page></story-page>',
    resolve:{
      hasPurchasedStory:function($location, $route, $q, userService){
        var storyId = $route.current.params.storyId;
        var deferred = $q.defer();
        if(userService.user.purchased.includes(storyId) || storyId === 'example'){
          deferred.resolve(true)
        }else{
          $location.path('/detail/'+$route.current.params.storyId).replace();
        }
        return deferred.promise;
      }
    }
  })
  .when('/detail/:storyId', { template: '<detail-page></detail-page>' })
}).run(function ($rootScope, $location, userService) { //Insert in the function definition the dependencies you need.
  //Do your $on in here, like this:
  $rootScope.$on("$routeChangeStart", function(event, next, current){
    //Do your things
    // $rootScope.$evalAsync(function () {
    //      $location.path('/login');
    //  });
  });
  // some global search stuff:
  document.getElementById('globalSearch').addEventListener("keyup", function(e, $location){
    if (e.keyCode == 13) {
      location.href = '/stories?search=' + e.target.value;
    }
  })
});
