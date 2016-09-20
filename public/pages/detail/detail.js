angular.module('directives')
.directive('detailPage', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, $routeParams, $q, $timeout, $rootScope, storiesService, paymentService, userService) {
      var promiseOfStory = storiesService.getSelectedStory($routeParams.storyId);
      $scope.paymentData = {};

      promiseOfStory.then(function(res){
        res.createdOn = moment(res.createdAt).format('MMM Do, YYYY');
        $scope.story = res;
      });


      paymentService.tokenRequest().then(function(res){
        const formName = 'form-field-wrapper'
        $scope.token = res.data;
        braintree.setup($scope.token, 'dropin', {
          container: formName,
          enableCORS: true,
          onReady: function() {
            paymentState = 'formReady'
          },
          onPaymentMethodReceived: function (result) {
            $scope.paymentState = 'processing';
            $scope.paymentData = result;
          }
        });
      })

      $scope.nextStep = function (e) {
        if(userService.user.autoPay){
          // download and take from autoPay
        } else {
          $scope.paymentState = 'pickType';
        }
      }

      $scope.purchase = function(){
        return paymentService.paymentPromise($scope.paymentData).then(function(res){
          /*
          show success screen
          store user as being in vault and set autoPay:
          https://developers.braintreepayments.com/guides/payment-methods/node
          https://developers.braintreepayments.com/guides/recurring-billing/overview
          as true on their user
          */
        })
      }

      $scope.showForm = function (paymentType) {
        var amount,
            singleUseValue;

        if (paymentType === 'single'){
          amount = $scope.story.price;
          singleUseValue = true;
        } else {
          amount = 3.00
          singleUseValue = false;
        }

        $scope.paymentState = 'showForm'
      }
    },
    templateUrl: '/pages/detail/detail.html',
    scope: {}
  }
}
)
