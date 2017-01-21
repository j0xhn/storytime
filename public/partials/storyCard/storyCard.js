angular.module('directives')
	.directive('storyCard', function () {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: '/partials/storyCard/storycard.html',
			scope: {
				story: '@',
        storyId: '='
			},
      controller: function($scope, storiesService){
        if(!$scope.story && $scope.storyId){
          storiesService.getSelectedStory($scope.storyId).then(function(res){
            $scope.story = res;
          })
        }
      }
		}
	}
)
