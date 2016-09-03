angular.module('directives')
.directive('detailPage', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, $routeParams, storiesService, paymentService) {
      var promiseOfStory = storiesService.getSelectedStory($routeParams.storyId);
      promiseOfStory.then(function(res){
        res.createdOn = moment(res.createdAt).format('MMM Do, YYYY');
        $scope.story = res;
      });


      $scope.startPurchase = function (e) {
        paymentService.tokenRequest().then(function(res){
          const token = res.data;
          console.log(token);
        })
      }
    },
    templateUrl: '/pages/detail/detail.html',
    scope: {}
  }
}
)
