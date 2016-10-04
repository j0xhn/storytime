console.log("loaded");
angular.module('directives')
	.directive('successPage', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller:  function($scope, $routeParams, $timeout, $compile, storiesService) {
        /*
        success page for all my generic success situations
        */
        $scope.type = $routeParams.type;
        $scope.url = window.location.origin+'/story/'+$routeParams.d;
      },
			templateUrl: '/pages/success/successPage.html',
      scope:{}
		}
	}
)
