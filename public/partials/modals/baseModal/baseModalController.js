angular.module('storytime')
.controller('BaseModalController', ['$scope', 'close', function($scope, close) {
  /*
    I use the same backdrop for my modals
    as I do for the side-nav bar.
    Because this app is not 100% angular
    the non-angular code found in header.js
    broadcasts and event when backdrop is clicked.
    This is also how I set the backdrop to be present
    on the screen and lock scrolling.
  */
  window.document.body.classList.add('lock');
  $scope.$on('BACKDROP_CLICKED', function(){
    console.log('made it here')
    close();
  })
  $scope.close = close;

}])
