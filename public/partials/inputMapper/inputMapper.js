angular.module('directives')
.directive('inputMapper', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/partials/inputMapper/inputMapper.html',
    scope: {
      input: '='
    },
    // controller: function($scope){
    //   debugger;
    // },
    // link: function($scope, elm, attrs){
    //   const type = $scope.input.type || 'text'
    //   if (type === 'text'){
    //     const input = document.createElement('text-input')
    //     elm[0].appendChild(input);
    //   } else if(type === 'toggle'){
    //     elm[0].innerHTML = '<toggle-input ng-label="$scope.input.keyword" ng-model="$scope.input.value" input="$scope.input"></toggle-input>';
    //   }
    // }
  }
})
