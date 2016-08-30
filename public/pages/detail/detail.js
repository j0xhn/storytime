angular.module('directives')
.directive('detailPage', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, $routeParams, storiesService) {
      var promiseOfStory = storiesService.getSelectedStory($routeParams.storyId);
      promiseOfStory.then(function(res){
        res.createdOn = moment(res.createdAt).format('MMM Do, YYYY');
        $scope.story = res;
      });
      var handler = StripeCheckout.configure({
        key: 'pk_xofIegbkEkF0NuExZk6B8chSHTMvR',
        image: '/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token: function(token) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
        }
      });
      $scope.startPurchase = function (e) {
        handler.open({
          name: 'Cat Poncho',
          description: '2 widgets',
          amount: 2000
        });
        e.preventDefault();
      }

      $(window).on('popstate', function() {
        handler.close();
      });
    },
    templateUrl: '/pages/detail/detail.html',
    scope: {}
  }
}
)
