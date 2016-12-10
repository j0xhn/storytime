angular.module('services')
.service('paymentService', function ($http, $q, userService) {
  const tokenRequest = $http({
    method: 'GET',
    url: '/braintree/token'
  });

  return {
    tokenRequest: function(){return tokenRequest},

    paymentPromise: function(paymentDetails){
      console.log('starting request: ', paymentDetails)
      paymentDetails._csrf = window._csrf;
      paymentDetails.paymentMethodToken = userService.getPaymentMethodToken();
      return $http({
        method: 'POST',
        url: '/braintree/process',
        data: paymentDetails
      }).then(function(res){
        debugger;
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

  }
});
