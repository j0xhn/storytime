angular.module('filters')
.filter('toArray', function () {
  return function(input) {
    if(!input) return;

    if (input instanceof Array) {
      return input;
    }

    return $.map(input, function(val) {
      return val;
    });
  };
});
