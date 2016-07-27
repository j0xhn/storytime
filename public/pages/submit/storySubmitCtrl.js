angular.module('storySubmitCtrl', [])
.controller('storySubmitCtrl', function($scope, storiesService) {
  $scope.submitStory = function(){
    storiesService.postStory({title: 'test'})
  }
});
