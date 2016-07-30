angular.module('directives')
	.directive('storyCard', function () {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: '/partials/storyCard/storycard.html',
			scope: {
				story: '='
			}
		}
	}
)
