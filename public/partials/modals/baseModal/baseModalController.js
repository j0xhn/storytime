angular.module('storytime')
.controller('BaseModalController', ['$scope', 'close', function($scope, close) {
  window.document.body.classList.add('lock');
  $scope.$on('BACKDROP_CLICKED', function(){
    console.log('made it here')
    close();
  })
  $scope.close = close;

}])
