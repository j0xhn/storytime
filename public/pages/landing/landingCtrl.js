angular.module('miniApp.landingCtrl', [])
.controller('LandingCtrl', function($scope, StoriesService) {
  $scope.myStories = StoriesService.getStories();
})
