angular.module('controllers')
.controller('storySubmitCtrl', function($scope, storiesService) {
  $scope.submitStory = function(story){
    // storiesService.postStory({title: 'test'}).then(function(res){
    //   console.log(res)
    // })
  }
  $scope.addSearchTag = function () {
    var newTag = '';
    $scope.story.tags.push(newTag);
  }
});
