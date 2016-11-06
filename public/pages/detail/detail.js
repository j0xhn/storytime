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
        if(userService.user.paymentInfo.coins){
          // download and take from autoPay
        } else if(!userService.isLoggedIn()) {
          $scope.paymentState = 'createAccount';
        } else if ($scope.story.price < userService.user.paymentInfo.coins){
          $scope.paymentState = 'pickType';
        }
      }

    },
    templateUrl: '/pages/detail/detail.html',
    scope: {}
  }
}
)
