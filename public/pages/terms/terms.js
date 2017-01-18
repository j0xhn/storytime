angular.module('directives')
	.directive('termsPage', function () {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: '/pages/terms/terms.html',
		}
	}
)
