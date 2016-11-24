angular.module('directives')
	.directive('checkoutPage', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller:  function($scope, $timeout, userService, paymentService, responseService, analyticService) {
        angular.element('.feedbackButton').hide();
        var paymentToken;
        $scope.monthly = true;
        $scope.paymentState = 'loading';
        $scope.createPaymentOptions = function(){
          var rate = $scope.monthly ? .5 : 1;
          var initialIndex = 1; // default value
          $scope.paymentOptions && $scope.paymentOptions.map(function(obj, index){
            if (angular.equals(obj,$scope.selectedPaymentOption)){ initialIndex = index }
          });
          $scope.paymentOptions = Array(5, 10, 20).map(function(value){
            var coins = value * 100;
            var cost = value * rate;
            return {
              label: coins + ' coins for $' + cost ,
              value: coins,
              recurring: $scope.monthly,
              amount: cost
            }
          });
          $scope.selectedPaymentOption = $scope.paymentOptions[initialIndex];
        }

        $scope.paymentOptionSelected = function(selection){
					analyticService.event('payment changed', $scope.selectedPaymentOption.label)
        }

        $scope.initBraintree = function(){
          var formName = 'form-field-wrapper'
          braintree.setup(paymentToken, 'dropin', {
            container: formName,
            enableCORS: true,
            onReady: function() {
              $scope.$apply($scope.paymentState = 'ready');
            },
            onPaymentMethodReceived: function (result) {
              $scope.paymentData = Object.assign($scope.selectedPaymentOption, result);
              $scope.purchase($scope.paymentData);
            }
          });
        }
        $scope.createPaymentOptions();

        $scope.purchase = function(payload){
          return paymentService.paymentPromise(payload).then(function(res){
            $scope.paymentState = 'success';
            console.log("response: ", res);
            /*
            show success screen
            store user as being in vault and set autoPay:
            https://developers.braintreepayments.com/guides/payment-methods/node
            https://developers.braintreepayments.com/guides/recurring-billing/overview
            as true on their user
            */
          })
        }

        paymentService.tokenRequest().then(function(res){
          if(responseService.isSuccess(res)){
            paymentToken = res.data;
            $scope.initBraintree();
          } else {
            analyticService.error('token request', 'checkout.js');
            $scope.checkoutError = 'It appears you are offline, check your internet connection';
          }
        })
      },
			templateUrl: '/pages/checkoutPage/checkoutPage.html',
      scope:{}
		}
	}
)
