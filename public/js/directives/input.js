angular.module('miniApp.directives', [])
	.directive('stInput', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: '/views/input.html',
			scope: {
				input: '='
			}
		}
	}
)
