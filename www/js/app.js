// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic','ionic.service.core',
  'starter.menu',
  'starter.myStories',
  'starter.story',
  'starter.about'
])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
      console.log(error);
    });
  });
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);

  $stateProvider
  .state('app', {
    url: '^/app',
    abstract: true,
    templateUrl: 'templates/menu/menu.html',
    controller: 'MenuCtrl'
  })
  .state('app.about', {
    url: '^/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about/about.html',
        controller: 'AboutCtrl'
      }
    }
  })

  // .state('app.search', {
  //   url: '/search',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/search.html'
  //     }
  //   }
  // })
  //
  // .state('app.browse', {
  //     url: '/browse',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/browse.html'
  //       }
  //     }
  //   })
    .state('app.myStories', {
      url: '^/myStories',
      views: {
        'menuContent': {
          templateUrl: 'templates/myStories/myStories.html',
          controller: 'MyStoriesCtrl'
        }
      }
    })


  .state('app.single', {
    url: '^/myStories/:storyId/:storyTitle',
    views: {
      'menuContent': {
        templateUrl: 'templates/story/story.html',
        controller: 'StoryCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/about');
});
