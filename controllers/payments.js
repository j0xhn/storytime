'use strict';
const braintree = require('braintree');
const User = require('../models/User');
const ResponseUtil = require('../util/ResponseUtil');

var gateway = braintree.connect({
  environment: braintree.Environment[process.env.NODE_ENV],
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUB_KEY,
  privateKey: process.env.BRAINTREE_PRI_KEY
});

exports.getBraintreeToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if(err){
      console.error('error generating token - possible connection issues');
      res.send({"error":"Error generating payment token"})
    }
    else { res.send(response.clientToken); }
  });
};

exports.processPayment = (req, res) => {
  // console.log('process payment: ', req);
  const {amount, repeating, nonce, storyId } = req.body;
  debugger;
  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    console.log('result: ',result);
    if(err){
      res.send(err)
    } else {
      debugger;
      if (!req.user) {res.send({error: 'No User'})
      } else {
        console.log(req);
        res.send(result)
      }
    }
  });
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
