'use strict';
const braintree = require('braintree');
const User = require('../models/User');

var gateway = braintree.connect({
  environment: braintree.Environment[process.env.NODE_ENV],
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUB_KEY,
  privateKey: process.env.BRAINTREE_PRI_KEY
});

exports.getBraintreeToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
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
      if (!req.user) res.send({error: 'No User'})
      console.log(req);
      // User.findById(req.user.id, (err, user) => {
      //   if (err) { return next(err); }
      //   user.purchased.push()
      //   user.save((err) => {
      //     if (err) {
      //       return next(err);
      //     }
      //     req.flash('success', { msg: 'Profile information has been updated.' });
      //     res.redirect('/story/');
      //   });
      // })
      res.send(result)
    }
  });

};
