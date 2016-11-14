angular.module('filters')
.filter('price', function () {
  return function(input, symbol, place){
    if(isNaN(input) || input < 1){
      return 'FREE';
    } else {
      var place = place === undefined ? true : place;
      if(place === true){
        // if you will return icon here
        return input;
      } else{
        // if you will return icon
        return input;
      }
    }
  }
})
