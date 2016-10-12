angular.module('directives')
.directive('textInput', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/partials/input/input.html',
    scope: {
      ngModel: '=?',
      ngLabel: '=?',
      type: '@',
      buttonText: '@',
      error: '=?',
      buttonClick: '=?'
    },
    controller: function($scope){
      // incase a model isn't passed in, just creates a temporary one
      const tempObject = {}
      $scope.ngModel = $scope.ngModel || tempObject.model;

    },
    link: function(scope, elm, attrs){
      elm.find('.label').html(scope.ngLabel || attrs.label);
      if(scope.buttonClick){
        const input = elm.find('.input')[0];
        scope.buttonClick = scope.buttonClick.bind(input);
        input.addEventListener('keyup', function(e){
          if(e.keyCode === 13){ scope.buttonClick(this.value); }
        })
      }
    }
  }
})
