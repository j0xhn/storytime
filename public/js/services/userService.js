angular.module('services')
.service('userService', function ($http) {
  var cachedUser = JSON.parse(user);
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
