angular.module('directives')
	.directive('feed', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller: function($scope, storiesService, $routeParams, $route) {
        var searchTerm = $routeParams.search;
        $scope.search = {
          general: searchTerm
        }


        var searchStories = function (searchObj){
          storiesService.searchStories(searchObj).then(function(res) {
            if (!res) analyticService.error('searchStories', 'no response - server is fouling up')
            $scope.myStories = res.data;
            if(!$scope.myStories || $scope.myStories.length === 0){
              $scope.noResults = true;
            }
          });
        };

        $scope.setAsSelectedStory = function(story){
          storiesService.setSelectedStory(story);
        }

        searchStories($scope.search);
      },
			templateUrl: '/partials/feed/feed.html',
			scope: {
        header: '@',
      }
		}
	}
)
