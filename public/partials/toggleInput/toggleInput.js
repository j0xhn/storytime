angular.module('directives')
.directive('toggleInput', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/partials/toggleInput/toggleInput.html',
    scope: {
      ngModel: '=?',
      ngLabel: '=?',
      input: '=',
      editMode: '@'
    },
    controller: function($scope){
      // incase a model isn't passed in, just creates a temporary one
      const tempObject = {}
      $scope.ngModel = $scope.ngModel || tempObject.model;
      $scope.toggleModel = function(){
        $scope.ngModel = !$scope.ngModel;
      }

    },
    link: function(scope, elm, attrs){
      //
    }
  }
})
