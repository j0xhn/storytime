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
      })
      // send info to API to do the actual processing
    }

  }
});
