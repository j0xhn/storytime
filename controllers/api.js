'use strict';
const _ = require('lodash');
const async = require('async');
const validator = require('validator');
const request = require('request');
const stripe = require('stripe')(process.env.STRIPE_SKEY);

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  res.render('api/index', {
    title: 'API Examples'
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'facebook');
  graph.setAccessToken(token.accessToken);
  async.parallel({
    getMyProfile: (done) => {
      graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err, me) => {
        done(err, me);
      });
    },
    getMyFriends: (done) => {
      graph.get(`${req.user.facebook}/friends`, (err, friends) => {
        done(err, friends.data);
      });
    }
  },
  (err, results) => {
    if (err) { return next(err); }
    res.render('api/facebook', {
      title: 'Facebook API',
      me: results.getMyProfile,
      friends: results.getMyFriends
    });
  });
};
