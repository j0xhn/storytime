angular.module('directives')
.directive('detailPage', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, $routeParams, $q, $timeout, $rootScope, storiesService, paymentService, userService) {
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
      handle non-logged in, not enough credit scenarios
      */
      $scope.nextStep = function (e) {
        if(!userService.isLoggedIn()){
          // download and take from autoPay
          $scope.paymentState = 'createAccount';
        } else {
          paymentService.payWithCoins($scope.story._id, $scope.story.price).then(function(res){
            debugger;
            userService.syncUser().then(function(success){
              debugger;
              if(success){ window.location.pathname = 'story/'}
            });
          })
        }
      }

    },
    templateUrl: '/pages/detail/detail.html',
    scope: {}
  }
}
)
