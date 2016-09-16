angular.module('services')
.service('paymentService', function ($http, $q) {
  const tokenRequest = $http({
    method: 'GET',
    url: '/braintree/token'
  });

  return {
    tokenRequest: function(){return tokenRequest},

    paymentPromise: function(paymentDetails){
      return $http({
        method: 'POST',
        url: '/braintree/process',
        data: paymentDetails
      })
    }

  }
});
