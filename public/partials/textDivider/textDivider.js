angular.module('directives')
	.directive('textDivider', function () {
		return {
			restrict: 'E',
			replace: true,
			template: '<table class="text-divider {{align}}"><tbody><tr><td><hr></td><td class="text italic">{{text}}</td><td><hr></td></tr></tbody></table>',
			scope: {
				text: '@',
        align: '@'
			}
		}
	}
)
