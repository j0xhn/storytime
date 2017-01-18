angular.module('directives')
	.directive('privacyPage', function () {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: '/pages/privacy/privacy.html',
		}
	}
)
