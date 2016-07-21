angular.module('storyCardDirective', [])
	.directive('storyCard', function () {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: '/partials/storycard/storycard.html',
			scope: {
				story: '='
			}
		}
	}
)
