angular.module('directives')
.directive('detailPage', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, $routeParams, storiesService, paymentService, userService) {
      var promiseOfStory = storiesService.getSelectedStory($routeParams.storyId);
      $scope.primaryButtonText = 'Download';

      promiseOfStory.then(function(res){
        res.createdOn = moment(res.createdAt).format('MMM Do, YYYY');
        $scope.story = res;
      });


      paymentService.tokenRequest().then(function(res){
        $scope.token = res.data;
        const formName = 'form-field-wrapper'
        braintree.setup($scope.token, 'dropin', {
          container: formName,
          paypal: {
            singleUse: true,
            amount: 10.00,
            currency: 'USD'
          }
        });
      })

      $scope.nextStep = function (e) {
        if(userService.user.autoPay){
          // download and take from autoPay
        } else {
          $scope.paymentState = 'pickType';
          $scope.primaryButtonText = 'Unlimited Downloads $3/mo'
        }
      }
    },
    templateUrl: '/pages/detail/detail.html',
    scope: {}
  }
}
)
