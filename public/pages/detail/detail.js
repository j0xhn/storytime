angular.module('directives')
.directive('detailPage', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, $routeParams, $q, $timeout, $rootScope, storiesService, paymentService, userService) {
      var promiseOfStory = storiesService.getSelectedStory($routeParams.storyId);
      $scope.primaryButtonText = 'Download';

      promiseOfStory.then(function(res){
        res.createdOn = moment(res.createdAt).format('MMM Do, YYYY');
        $scope.story = res;
      });


      paymentService.tokenRequest().then(function(res){
        $scope.token = res.data;
      })

      $scope.nextStep = function (e) {
        if(userService.user.autoPay){
          // download and take from autoPay
        } else {
          $scope.paymentState = 'pickType';
        }
      }

      $scope.promiseTest = function(){
        var deferred = $q.defer();
        $timeout(function(){
          deferred.resolve(true);
        }, 3000)
        return deferred.promise;
      };
      $scope.showForm = function (paymentType) {

        const formName = 'form-field-wrapper'
        var amount,
            singleUseValue;

        $scope.paymentState = 'showForm'

        if (paymentType === 'single'){
          amount = $scope.story.price;
          debugger;
          singleUseValue = true;
        } else {
          amount = 3.00
          singleUseValue = false;
        }

        var deferred = $q.defer();
        braintree.setup($scope.token, 'dropin', {
          container: formName,
          paypal: {
            singleUse: singleUseValue,
            amount: amount,
            currency: 'USD'
          },
          onReady: function() {
            debugger;
          },
          onPaymentMethodReceived: function (result) {
            $scope.paymentState = 'processing';
            paymentService.paymentPromise(result).then(function(res){
              debugger;
              deferred.resolve(res);
              /*
              do logic here to send back to our server
              proceed to next step in checkout
              store user as being in vault and set autoPay:
              https://developers.braintreepayments.com/guides/payment-methods/node
              https://developers.braintreepayments.com/guides/recurring-billing/overview
              as true on their user
              */
            })
          }
        });

        return deferred.promise;
      }
    },
    templateUrl: '/pages/detail/detail.html',
    scope: {}
  }
}
)
