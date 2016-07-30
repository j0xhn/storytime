angular.module('textAreaDirective', [])
	.directive('textArea', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: '/partials/textArea/textArea.html',
			scope: {
				ngModel: '=',
				ngLabel: '='
			},
			link: function(scope, elm, attrs){
				elm.find('label').html(scope.ngLabel || attrs.label)
			}
		}
	}
)
