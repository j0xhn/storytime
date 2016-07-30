angular.module('controllers')
.controller('storySubmitCtrl', function($scope, storiesService) {
  $scope.submitStory = function(story){
    debugger;
    storiesService.postStory({title: 'test'}).then(function(res){
      console.log(res)
    })
  }
});
