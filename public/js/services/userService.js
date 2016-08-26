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
    getAllUsers: function () {
      return $http({
        method: 'GET',
        url: '/users/all'
      });
    },
    user: cachedUser
  }
});
