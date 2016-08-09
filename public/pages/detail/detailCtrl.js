angular.module('controllers', [])
.controller('DetailCtrl', function($scope, storiesService) {
  storiesService.getStories().then(function(res) {
    $scope.myStories = res.data.stories;
  });
})
