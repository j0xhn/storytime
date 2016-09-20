angular.module('services')
.service('paymentService', function ($http, $q) {
  const tokenRequest = $http({
    method: 'GET',
    url: '/braintree/token'
  });

  return {
    tokenRequest: function(){return tokenRequest},

    paymentPromise: function(paymentDetails){
      console.log('starting request: ', paymentDetails)
      paymentDetails._csrf = window._csrf;
      return $http({
        method: 'POST',
        url: '/braintree/process',
        data: paymentDetails
      })
    }

  }
});
