angular.module('inputDirective', [])
	.directive('textInput', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: '/partials/input/input.html',
			scope: {
				model: '=',
				label: '='
			},
			link: function(scope, elm, attrs){
				elm.find('label').html(scope.label || attrs.staticlabel)
			}
		}
	}
)
