angular.module('directives')
	.directive('adminPaymentsPage', function () {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: '/pages/admin/payments/payments.html',
      controller: function($scope, paymentService, ModalService){
        var test = paymentService.getPayments;
        paymentService.getPayments().then(function(res){
          $scope.payments = res.data;
        })

        $scope.showDetails = function(details){
          var data = angular.merge($scope, { details: details });
          ModalService.showModal({
            templateUrl: "partials/modals/purchaseDetails/purchaseDetails.html",
            controller: "BaseModalController",
            scope: data
          })
        }
      }
		}
	}
)
