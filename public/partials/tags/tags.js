angular.module('directives')
.directive('tags', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/partials/tags/tags.html',
    scope: {
      tags: '=',
    }
  }
})
