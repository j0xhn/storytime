angular.module('directives')
	.directive('detailPage', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller: function($scope, $routeParams, storiesService) {
         var promiseOfStory = storiesService.getSelectedStory($routeParams.storyId);
         promiseOfStory.then(function(res){
           res.createdOn = moment(res.createdAt).format('MMM Do, YYYY');
           $scope.story = res;
         });
      },
			templateUrl: '/pages/detail/detail.html',
			scope: {}
		}
	}
)
