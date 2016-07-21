angular.module('inputDirective', [])
	.directive('stInput', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: '/partials/input.html',
			scope: {
				input: '='
			}
		}
	}
)
