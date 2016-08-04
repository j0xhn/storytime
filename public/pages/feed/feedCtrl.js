angular.module('controllers', [])
.controller('feedCtrl', function($scope, storiesService) {
  storiesService.getStories().then(function(res) {
    $scope.myStories = res.data.stories;
  });
})
