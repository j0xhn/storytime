angular.module('directives')
	.directive('divider', function () {
		return {
			restrict: 'E',
			replace: true,
			template: '<table class="divider {{align}}"><tbody><tr><td><hr></td><td class="text" ng-if="text || title">{{text}}<span class="title">{{title}}</span></td><td><hr></td></tr></tbody></table>',
			scope: {
				text: '@',
				title: '@',
        align: '@'
			}
		}
	}
)
