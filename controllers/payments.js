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
  console.log('process payment: ', req);
  const {amount, repeating, nonceFromTheClient } = req.data;
  gateway.transaction.sale({
    amount: "10.00",
    paymentMethodNonce: nonceFromTheClient,
    descriptor: {
      name: "OPEN APPARATUS LLC",
      phone: "2082273646",
      url: "storytime.com"
    }
  }, function (err, result) {
    result.transaction.descriptor.name;
    // "company*my production"
    result.transaction.descriptor.phone;
    // "3125551212"
    res.send(result)
  });

};
