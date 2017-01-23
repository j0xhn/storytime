angular.module('directives')
	.directive('myStories', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller:  function($scope, $routeParams, $timeout, $compile, userService, $filter) {
        /*
        All logic for if have purchased story is done in the routing
        if they come to this view, it should be because it's been purchased,
        or because I have specifically passed in the id of the story I want
        */
        var storyObjects = $filter('toArray')(userService.getPurchased());
        if(storyObjects){
          $scope.purchasedStories = storyObjects.map(function(storyObj){return storyObj.storyId});
        } else {
          $scope.message = "Looks like you don't have any saved stories. Check out our stories and start a collection of your very own!"
        }
      },
			templateUrl: '/pages/myStories/myStories.html',
		}
	}
)
