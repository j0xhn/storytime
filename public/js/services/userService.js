angular.module('services')
.service('userService', function ($http) {
  var cachedUser = JSON.parse(user);
  cachedUser.purchased.push('57bb0e1d71cccefeccc6dfda');
  delete window.user;
  // if ( user ){
  //   cachedUser = JSON.parse(user);
  //   delete window.user;
  // } else {
  //   cachedUser = { guest: true };
  // }
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
    user: cachedUser,
    isLoggedIn: function() {
      return !!cachedUser.password;
    },
  }
});
