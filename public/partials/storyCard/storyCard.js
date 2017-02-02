angular.module('directives')
	.directive('storyCard', function () {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: '/partials/storyCard/storycard.html',
			scope: {
				story: '=',
        storyId: '='
			},
      controller: function($scope, storiesService, utilityService){
        // check if story is a string or an object
        if(utilityService.isString($scope.story) || $scope.storyId){
          var storyId = $scope.storyId || $scope.story
          storiesService.getSelectedStory(storyId).then(function(res){
            $scope.story = res;
          })
        }
      }
		}
	}
)
