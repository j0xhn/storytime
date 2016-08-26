angular.module('directives')
.directive('list', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      listArray: '=',
    },
    link: function(scope, elm, attrs){
      debugger;
      var listArray = attrs.listarray;
      listArray.map(function(item){
        debugger;
        elm.appendChild('<p>'+item+'</p>');
      });
    }
  }
})
