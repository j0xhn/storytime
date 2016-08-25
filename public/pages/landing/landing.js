angular.module('directives')
	.directive('landing', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller: function($scope, storiesService) {
        // logic goes here
      },
			templateUrl: '/pages/landing/landing.html',
			scope: {}
		}
	}
)
