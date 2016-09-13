angular.module('directives')
.directive('detailPage', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, $routeParams, $rootScope, storiesService, paymentService, userService) {
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

      $scope.showForm = function (paymentType) {
        $scope.paymentState = 'showForm'
        const formName = 'form-field-wrapper'
        var amount,
            singleUseValue;

        if (paymentType === 'single'){
          amount = $scope.story.price;
          debugger;
          singleUseValue = true;
        } else {
          amount = 3.00
          singleUseValue = false;
        }
        braintree.setup($scope.token, 'dropin', {
          container: formName,
          paypal: {
            singleUse: singleUseValue,
            amount: amount,
            currency: 'USD'
          },
          onPaymentMethodReceived: function (result) {
            debugger;
            $scope.paymentState = 'processing';
            paymentService.paymentPromise(result).then(function(res){
              // do logic here to send back to our server
              // proceed to next step in checkout
              // store user as being in vault and set autoPay
              // as true on their user
            })
          }
        });
      }
    },
    templateUrl: '/pages/detail/detail.html',
    scope: {}
  }
}
)
