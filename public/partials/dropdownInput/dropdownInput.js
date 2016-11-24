angular.module('directives')
.directive('dropdownInput', function ($window) {
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			options: '=',
			model: '=',
			disabled: '=',
			changehandler: '=',
			includebuttons: '@',
			placeholder: '@',
		},
		templateUrl: '/partials/dropdownInput/dropdownInput.html',
		link: function ($scope, elm, attr) {
				$scope.internalChangeHandler = function(val){
					$scope.model = val;
					$scope.changehandler(val);
				}
		}
	}
});
