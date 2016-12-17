angular.module('services')
.service('paymentService', function ($http, $q, userService, analyticService, responseService) {

  const tokenRequest = $http({
    method: 'GET',
    url: '/braintree/token',
    params: { customerId: userService.user.paymentInfo.customerId }
  });

  return {
    tokenRequest: function(){
      return tokenRequest
    },

    paymentPromise: function(paymentDetails){
      console.log('starting request: ', paymentDetails)
      paymentDetails._csrf = window._csrf;
      paymentDetails.paymentMethodToken = userService.getPaymentMethodToken();
      return $http({
        method: 'POST',
        url: '/braintree/process',
        data: paymentDetails
      }).catch(function(err){
        analyticService.error('paymentPromise', err)
        console.error(res);
      })
    },

    payWithCoins: function(storyId, price){
      console.log('starting coin payment: ', storyId, price)
      var paymentDetails = {storyId: storyId, price: price};
      paymentDetails._csrf = window._csrf;
      return $http({
        method: 'POST',
        url: '/payments/coin',
        data: paymentDetails
      })
    }

    coinAnimation: function(addedCoins){
    $btn = angular.element(this);
    var $cart = angular.element('.topNav .coin')
    var $coin = $('<div class="coin badge">')
        .insertAfter($btn)
        .animate({
            "top": $cart.offset().top,
            "left": $cart.offset().left
        }, 1000, function() {
            $coin.remove();
        });
    }

  }
});
