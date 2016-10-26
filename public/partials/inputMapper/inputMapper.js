angular.module('directives')
.directive('inputMapper', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/partials/inputMapper/inputMapper.html',
    scope: {
      input: '=',
      editable: '@'
    }
  }
})
