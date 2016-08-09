console.log('user service loaded')
angular.module('services')
.service('userService', function ($http) {

  return {
    getAllUsers: function () {
      return $http({
        method: 'GET',
        url: '/users/all'
      });
    },
    getCurrentUser: function() {
      return $http({
        method: 'GET',
        url: '/users/current'
      })
    }
  }
});
