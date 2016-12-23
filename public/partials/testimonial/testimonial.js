angular.module('directives')
.directive('testimonial', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: '/partials/testimonial/testimonial.html',
    scope: {
      imageurl: '@',
      name: '@',
      descriptor: '@'
    }
  }
})
