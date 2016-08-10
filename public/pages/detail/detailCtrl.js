angular.module('controllers')
.controller('DetailCtrl', function($scope, $routeParams, storiesService) {
   $scope.story = storiesService.selectedStory();
   if (!$scope.story) {
     storiesService.searchStories($routeParams.storyId).then(function(res){
       $scope.story = res.data.stories[0];
       console.log('not via cache')
     })
   }
})
