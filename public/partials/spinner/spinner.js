angular.module('directives')
	.directive('spinner', function () {
		return {
			restrict: 'E',
			replace: true,
      templateUrl: '/partials/spinner/spinner.html',
      link: function(scope, elm, attrs){
        if (attrs.color === 'gray'){
          elm[0].className = elm[0].className + ' ispinner--gray';
        }
      }
		}
	}
)
