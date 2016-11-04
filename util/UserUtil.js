const User = require('../models/User');

const UserUtils = {};
UserUtils.isAdmin = function(user){
  if (user.permissions){
    return (user.permissions.indexOf('admin') > -1)
  } else {
    return false
  }
};
module.exports = UserUtils;
