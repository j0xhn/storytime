angular.module('directives')
.directive('detailPage', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, $routeParams, $q, $timeout, $rootScope, storiesService, paymentService, userService, responseService, analyticService) {
      /*
      remove feedback button
      */
      angular.element('.feedbackButton').hide()
      /*
      get story and format appropriately
      */
      storiesService.getSelectedStory($routeParams.storyId).then(function(res){
        res.createdOn = moment(res.createdAt).format('MMM Do, YYYY');
        $scope.story = res;
      });
      /*
      handle non-logged in,
      not enough credit scenarios,
      success
      */
      function handleSuccess(){
        window.location.pathname = '/story/'+$routeParams.storyId;
      }
      $scope.nextStep = function (e) {
        if(!userService.isLoggedIn()){
          // download and take from autoPay
          $scope.paymentState = 'createAccount';
        } else {
          paymentService.payWithCoins($scope.story._id, $scope.story.price).then(function(res){
            if (responseService.isSuccess(res)){
              userService.syncUser().then(function(res){
                if(res){ handleSuccess();
                } else { analyticService.error('user sync', 'detail.js') }
              });
            } else {
              analyticService.error('coin payment', 'detail.js')
            }
          })
        }
      }

    },
    templateUrl: '/pages/detail/detail.html',
    scope: {}
  }
}
)
