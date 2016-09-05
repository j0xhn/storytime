angular.module('directives')
	.directive('feed', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller: function($scope, storiesService, $routeParams, $route) {
        var searchObj = {
          title: $routeParams.search,
        }

        var searchStories = function (searchObj){
          storiesService.searchStories(searchObj).then(function(res) {
            $scope.myStories = res.data.stories;
            if(!$scope.myStories){
              $scope.noResults = true;
            }
          });
        };

        $scope.setAsSelectedStory = function(story){
          storiesService.setSelectedStory(story);
        }

        searchStories(searchObj);
      },
			templateUrl: '/pages/feed/feed.html',
			scope: {}
		}
	}
)
