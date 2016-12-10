angular.module('services')
.service('userService', function ($http, $q, analyticService, responseService) {

  var cachedUser = user;
  delete window.user;


  return {

    setUserInfo: function (userInfo) {
      const newUser = Object.assign(cachedUser, userInfo)
      newUser._csrf = window._csrf;
      return $http({
        method: 'POST',
        url: '/account/updateorcreate',
        data: newUser
      })
    },

    getAllUsers: function () {
      return $http({
        method: 'GET',
        url: '/users/all'
      });
    },

    syncUser: function () {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/users/current'
      }).then(function(res){
        if(responseService.isSuccess(res)){ deferred.resolve(true)}
        else{
          analyticService.error('syncUser', 'userService.js')
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    },

    user: cachedUser,
    isLoggedIn: function() { return !!cachedUser.password; },
    isAdmin: function() { return cachedUser.permissions.indexOf('admin') > -1 },
    hasPurchased: function(storyId) { return cachedUser.purchased && cachedUser.purchased.hasOwnProperty(storyId) },
    getCustomerId: function() { return cachedUser.paymentInfo.customerId },
    getPaymentMethodToken: function() { return cachedUser.paymentInfo.paymentMethodToken }
  }
});
