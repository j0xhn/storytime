angular.module('storytime')
.controller('BaseModalController', ['$scope', 'close', '$location', function($scope, close, $location) {
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
    close();
  })
  $scope.close = function(){
    // Not quite sure why I need this, but closing the modal doesn't
    // remove the backdrop, so I do it manually here.
    window.document.body.classList.remove('lock');
    close();
  };
  $scope.okayClick = function(message){
    if($scope.okayButtonLink){
      $location.path($scope.okayButtonLink)
    }
  }
}])
