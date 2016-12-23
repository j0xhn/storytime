angular.module('services')
.service('paymentService', function ($http, $q, $timeout, userService, analyticService, responseService) {

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
    },

    coinAnimation: function(element, addedCoins){
    var $cart = angular.element('.topNav .coin').addClass('animate');
    var count = $cart.text();
    var coinArray = new Array(addedCoins);
    var goal = addedCoins;
    var delay = (600/addedCoins);

    function countdown(){
      $cart.text(count++);
      if(goal){
        goal--
        $timeout(countdown,delay)
      }
      else($cart.removeClass('animate'))
    }
    countdown();
  }

}
});
