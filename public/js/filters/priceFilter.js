angular.module('priceFilter', [])
.filter('price', function () {
  return function(input, symbol, place){
    if(isNaN(input)){
      return input;
    } else {
      var symbol = symbol || '$';
      if (input < 1){
        input = ''+input;
        while(input.charAt(0) === '0')
        input = input.substr(1);
      }
      var place = place === undefined ? true : place;
      if(place === true){
        return symbol + input;
      } else{
        return input + symbol;
      }
    }
  }
})
