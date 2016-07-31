angular.module('directives')
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
				if (attrs.resize === 'none') elm.find('textarea').css('resize', 'none');
				elm.find('label').html(scope.ngLabel || attrs.label);
			}
		}
	}
)
