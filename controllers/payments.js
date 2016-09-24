'use strict';
const braintree = require('braintree');

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
  const {amount, repeating, nonce } = req.body;
  debugger;
  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    console.log('result: ',result);
    res.send(result)
  });

};
