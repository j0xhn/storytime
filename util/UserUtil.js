const User = require('../models/User');
const Bluebird = require("bluebird");

const UserUtils = {};

UserUtils.isAdmin = function(user){
  if (user.permissions){
    return (user.permissions.indexOf('admin') > -1)
  } else {
    return false
  }
};

UserUtils.addCoins = function(userId, coins){
  return new Bluebird(function(resolve, reject) {
    User.findByIdAndUpdate(
      userId,
      { $inc: { "paymentInfo.coins": coins}},
      (err, user) => {
        if(err){ console.error('Error adding coins to user after successfull purchase');}
        else { resolve(user)}
      }
    )
  })
}

module.exports = UserUtils;
