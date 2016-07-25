angular.module('userService', [])
.service('UserService', function () {

  return {
    getAllUsers: function () {
      return {'key':'all users'};
    }
  };
});
