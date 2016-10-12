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
        $scope.paymentData.amount = res.price;
        $scope.paymentData.storyId = res._id;
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
            $scope.paymentData = Object.assign($scope.paymentData,result);
            $scope.purchase($scope.paymentData);
          }
        });
      })

      $scope.nextStep = function (e) {
        if(userService.user.autoPay){
          // download and take from autoPay
        } else if(userService.isLoggedIn()) {
          $scope.paymentState = 'createAccount'
        } else {
          $scope.paymentState = 'pickType';
        }
      }

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

      $scope.showForm = function (paymentType) {
        var amount,
            singleUseValue;

        if (paymentType === 'single'){
          $scope.paymentData.amount = $scope.story.price;
          $scope.paymentData.repeating = false;
          singleUseValue = true;
        } else {
          amount = 3.00
          $scope.paymentData.repeating = true;
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
