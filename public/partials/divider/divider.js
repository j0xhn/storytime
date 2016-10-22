angular.module('directives')
	.directive('divider', function () {
		return {
			restrict: 'E',
			replace: true,
			template: '<table class="divider {{align}} {{class}}"><tbody><tr><td><div class="d_hr"></td><td class="d_textWrapper" ng-if="text || title"><span class="d_text" ng-if="text">{{text}}</span><span class="d_title" ng-if="title">{{title}}</span></td><td><div class="d_hr"></td></tr></tbody></table>',
			scope: {
				text: '@',
				title: '@',
        align: '@',
        class: '@'
			}
		}
	}
)
