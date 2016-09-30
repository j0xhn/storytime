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
            $scope.myStories = res.data;
            if(!$scope.myStories){
              $scope.noResults = true;
            }
          });
        };

        $scope.setAsSelectedStory = function(story){
          storiesService.setSelectedStory(story);
        }

        searchStories($scope.search);
      },
			templateUrl: '/pages/feed/feed.html',
			scope: {}
		}
	}
)
