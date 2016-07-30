angular.module('inputDirective', [])
	.directive('textInput', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: '/partials/input/input.html',
			scope: {
				ngModel: '=',
				ngLabel: '='
			},
			link: function(scope, elm, attrs){
				elm.find('label').html(scope.ngLabel || attrs.staticlabel)
			}
		}
	}
)
