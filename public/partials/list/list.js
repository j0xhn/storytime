angular.module('directives')
.directive('list', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      listArray: '=',
    },
    link: function(scope, elm, attrs){
      var listArray = attrs.listarray;
      listArray.map(function(item){
        elm.appendChild('<p>'+item+'</p>');
      });
    }
  }
})
