angular.module('directives')
	.directive('successPage', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller:  function($scope, $routeParams, $timeout, $compile, storiesService, paymentService, {
        /*
        success page for all my generic success situations
        */
        $scope.type = $routeParams.type;
        // d stands for data for a successful story save
        $scope.url = window.location.origin+'/story/'+$routeParams.d;
        // successful coin
        $scope.addedCoins = $routeParams.coins;
        if($scope.addedCoins){
          paymentService.coinAnimation($scope.addedCoins);
        }
      },
			templateUrl: '/pages/success/successPage.html',
      scope:{}
		}
	}
)
