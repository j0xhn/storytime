angular.module('feedCtrl', [])
.controller('feedCtrl', function($scope, StoriesService) {
  $scope.myStories = StoriesService.getStories();
})
