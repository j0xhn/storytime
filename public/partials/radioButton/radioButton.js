angular.module('directives')
.directive('radioButton', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/partials/radioButton/radioButton.html',
    scope: {
      ngModel: '=',
      label: '@',
    },
    controller: function(scope, elm, attrs){
      debugger;
    }
  }
})
