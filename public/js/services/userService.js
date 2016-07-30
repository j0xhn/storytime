angular.module('services')
.service('userService', function () {

  return {
    getAllUsers: function () {
      return {'key':'all users'};
    }
  };
});
