angular.module('directives')
	.directive('detailPage', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller: function($scope, $routeParams, storiesService) {
         $scope.story = storiesService.selectedStory();
         if (!$scope.story) {
           storiesService.searchStories($routeParams.storyId).then(function(res){
             $scope.story = res.data.stories[0];
            //  debugger;
           })
         }
      },
			templateUrl: '/pages/detail/detail.html',
			scope: {}
		}
	}
)
