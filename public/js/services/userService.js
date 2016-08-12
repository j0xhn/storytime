angular.module('services')
.service('userService', function ($http) {
  var cachedUser = JSON.parse(user);
  delete window.user;
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
