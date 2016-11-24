'use strict';
const braintree = require('braintree');
const User = require('../models/User');
const ResponseUtil = require('../util/ResponseUtil');
const UserUtil = require('../util/UserUtil');

var gateway = braintree.connect({
  environment: braintree.Environment[process.env.NODE_ENV],
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUB_KEY,
  privateKey: process.env.BRAINTREE_PRI_KEY
});

exports.getBraintreeToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if(err){
      ResponseUtil.error(req, res, err);
      console.error('error generating token - possible connection issues');
    }
    else { ResponseUtil.success(req, res, response.clientToken); }
  });
};

exports.processPayment = (req, res) => {
  const {amount, recurring, nonce, paymentMethodToken } = req.body;
  function proccess(amount, recurring, paymentMethodToken) {
    gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      recurring: recurring,
      options: {
        submitForSettlement: true,
        storeInVaultOnSuccess: true
      }
    }, function (err, result) {
      if(err){
        ResponseUtil.error(req, res, err);
      } else if (!req.user) {
        ResponseUtil.error(req, res, { message: 'No User'} )
      } else if (result.success) {
        result.transaction.customer.id;
        user.paymentInfo.customerId = result.customer_id;
        UserUtil.saveUser(user).then(function(){
          ResponseUtil.success(req, res)
        })
      } else {

      }
    });
  }
  if(!paymentMethodToken){
    gateway.customer.create({
      firstName: req.user.profile.name,
      paymentMethodNonce: nonceFromTheClient
    }, function (err, result) {
      if(result.success){
        user.paymentInfo.customerId = result.customer.id;
        user.paymentInfo.paymentMethodToken = result.customer.paymentMethods[0].token;
        user.save((err, user) => {
          if (err) {
            return next(err);
            ResponseUtil.error(req, res, err);
          } else {
            debugger;
            // now subscribe or do one of transaction
          }
        });
      }
    });
  } else {
    proccess(amount, recurring, paymentMethodToken)
  }
}

exports.payWithCoins = (req,res) => {
  User.findById(req.user.id, (err, user) => {
    var coins = isNaN(req.body.price) ? 0 : req.body.price;
    var storyId = req.body.storyId

    if (err) { return next(err); }
    if (user.purchased.hasOwnProperty(storyId)){
      ResponseUtil.success(req, res, {message: 'Story has already been unlocked'})
    } else {
      var purchaseInfo = {
        storyId: storyId,
        purchaseDate: new Date(),
        price: coins
      };

      user.paymentInfo.coins = user.paymentInfo.coins - coins;
      user.purchased[storyId] = purchaseInfo;
      user.markModified('purchased');
      user.save((err, user) => {
        if (err) {
          return next(err);
          ResponseUtil.error(req, res, err);
        } else {
          ResponseUtil.success(req, res);
        }
      });
    }
  });
};
