angular.module('filters')
.filter('price', function () {
  return function(input, symbol, place){
    if(isNaN(input)){
      return input;
    } else {
      if (input < 1){
        input = ''+input;
        while(input.charAt(0) === '0')
        input = input.substr(1);
      }
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
