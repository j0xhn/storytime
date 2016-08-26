angular.module('directives')
	.directive('storyPage', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller:  function($scope, $routeParams, $timeout, $compile, storiesService) {
        /*
        All logic for if have purchased story is done in the routing
        if they come to this view, it should be because it's been purchased,
        or because I have specifically passed in the id of the story I want
        */
        $scope.storyId = $routeParams.storyId;
      },
			templateUrl: '/pages/storyPage/storyPage.html',
      scope:{}
		}
	}
)
