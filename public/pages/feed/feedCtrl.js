angular.module('controllers', [])
.controller('feedCtrl', function($scope, storiesService) {
  $scope.myStories = storiesService.getStories();
})
