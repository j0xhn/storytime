angular.module('services')
.service('userService', function ($http) {

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

    syncUser: function() {
      // create promise

      // get user

      // set as cachedUser and resolve
      return $http({
        method: 'GET',

      })
    }

    user: cachedUser,
    isLoggedIn: function() { return !!cachedUser.password; },
    isAdmin: function() { return cachedUser.permissions.indexOf('admin') > -1 }
  }
});
