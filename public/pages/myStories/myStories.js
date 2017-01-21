angular.module('directives')
	.directive('myStories', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller:  function($scope, $routeParams, $timeout, $compile, userService) {
        /*
        All logic for if have purchased story is done in the routing
        if they come to this view, it should be because it's been purchased,
        or because I have specifically passed in the id of the story I want
        */
        $scope.purchasedStories = userService.getPurchased();
      },
			templateUrl: '/pages/myStories/myStories.html',
		}
	}
)
