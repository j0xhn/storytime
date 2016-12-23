angular.module('directives')
	.directive('spinner', function () {
		return {
			restrict: 'E',
			replace: true,
      templateUrl: '/partials/spinner/spinner.html',
      link: function(scope, elm, attrs){
        var spinner = elm[0];
        if (attrs.color === 'gray'){ spinner.classList.add('ispinner--gray'); }
        if (attrs.fill) { spinner.classList.add('fill'); }
      }
		}
	}
)
