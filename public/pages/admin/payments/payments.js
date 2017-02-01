angular.module('directives')
	.directive('adminPaymentsPage', function () {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: '/pages/admin/payments/payments.html',
      controller: function($scope, paymentService){
        var test = paymentService.getPayments;
        paymentService.getPayments().then(function(res){
          $scope.payments = res.data;
        })
      }
		}
	}
)
