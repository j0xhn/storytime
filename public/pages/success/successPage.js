angular.module('directives')
	.directive('successPage', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller:  function($scope, $routeParams, $timeout, $compile, storiesService, paymentService) {
        /*
        success page for all my generic success situations
        */
        $scope.type = $routeParams.type;
        // d stands for data for a successful story save
        $scope.url = window.location.origin+'/story/'+$routeParams.d;
        // successful coin
        $scope.addedCoins = $routeParams.coins;
        if($scope.addedCoins){
          $timeout(function(){
            paymentService.coinAnimation(angular.element('.added-coins')[0], $scope.addedCoins);
          }, 1000);
        }
      },
			templateUrl: '/pages/success/successPage.html',
      scope:{}
		}
	}
)
