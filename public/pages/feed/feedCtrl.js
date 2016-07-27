angular.module('feedCtrl', [])
.controller('feedCtrl', function($scope, storiesService) {
  $scope.myStories = storiesService.getStories();
})
