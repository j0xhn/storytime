angular.module('services')
.service('paymentService', function ($http) {
  const tokenRequest = $http({
    method: 'GET',
    url: '/braintree/token'
  });

  return {
    tokenRequest: function(){return tokenRequest}
  }
});
