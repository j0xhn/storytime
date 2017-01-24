angular.module('directives')
	.directive('feed', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller: function($scope, storiesService, $routeParams, $route) {

        if($scope.storyids){
          $scope.myStories = $scope.storyids;
        } else {
          $scope.searchTerm = $routeParams.search;
          var searchObj = { general: $scope.searchTerm }

          var searchStories = function (searchObj){
						$scope.loading = true;
            storiesService.searchStories(searchObj).then(function(res) {
							$scope.loading = false;
              if (!res) analyticService.error('searchStories', 'no response - server is fouling up')
              $scope.myStories = res.data;
              if(!$scope.myStories || $scope.myStories.length === 0){
                $scope.noResults = true;
              }
            });
          };

          $scope.setAsSelectedStory = storiesService.setSelectedStory;
          searchStories(searchObj);
        }
      },
			templateUrl: '/partials/feed/feed.html',
			scope: {
        header: '@',
        storyids: '=',
        search: '='
      }
		}
	}
)
