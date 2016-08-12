angular.module('directives')
	.directive('feed', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller: function($scope, storiesService) {
        storiesService.getStories().then(function(res) {
          $scope.myStories = res.data.stories;
        });
        $scope.setAsSelectedStory = function(story){
          storiesService.setSelectedStory(story);
        }
      },
			templateUrl: '/pages/feed/feed.html',
			scope: {}
		}
	}
)
