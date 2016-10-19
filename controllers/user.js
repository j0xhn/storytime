const async = require('async');
const crypto = require('crypto');
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const helper = require('sendgrid').mail;
const passport = require('passport');
const User = require('../models/User');
const MessagingUtil = require('../util/MessagingUtil');

/**
* GET /login
* Login page.
*/
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: 'Login'
  });
};

exports.getEmptyUser = (req,res) => {
  const user = new User();
  return user;
}

exports.setStoryAsPurchased = (req,res) => {
  if (req.user) {
    return res.redirect('/');
  } else {
    return {error: 'User not logged in.'}
  }
}

/**
* POST /login
* Sign in using email and password.
*/
exports.postLogin = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      // checks for guest user
      User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          console.log("error in find query");
          req.flash('errors', info);
          return res.redirect('/login');
        }
        if (user.password){
          req.flash('errors', info)
          return res.redirect('/login');
        } else {
          user.password = req.body.password;
          user.save((err) => {
            if (err) { return next(err); }
            req.logIn(user, (err) => {
              if (err) { return next(err); }
              console.log("login after user set");
              res.redirect(req.session.returnTo || '/');
            });
          });
        }
      });
    } else {
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        console.log("normal login");
        res.redirect(req.session.returnTo || '/');
      });
    }
  })(req, res, next);
};

/**
* GET /logout
* Log out.
*/
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

/**
* GET /signup
* Signup page.
*/
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/signup', {
    title: 'Create Account'
  });
};

/**
* POST /signup
* Create a new local account.
*/
exports.postSignup = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists.' });
      return res.redirect('/signup');
    }
    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
};

/**
* GET /account
* Profile page.
*/
exports.getAccount = (req, res) => {
  res.render('account/profile', {
    title: 'Account Management'
  });
};

/**
* GET /users
* List of All Users
*/
exports.getAllUsers = (req, res) => {
  User.find({}).exec(function(err, users){
    res.render('account/users', { users: users });
  });
};


/**
* GET /users/current
* Gets current user
*/
exports.getCurrentUser = (req, res) => {
  res.send(req.user)
}

/**
* POST /account/profile
* Update profile information.
*/
exports.postUpdateProfile = (req, res, next) => {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/');
  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save((err) => {
      if (err) {
        console.log(err);
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
          return res.redirect('/login');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Profile information has been updated.' });
      res.redirect('/account');
    });
  });
};

/**
* POST /account/password
* Update current password.
*/
exports.postUpdateOrCreate = (req, res, next) => {
  const user = req.body;
  User.update( { _id: user._id }, user, { upsert: true },
    function (err, result) {
      if (err) {
        console.error(err);
        res.send({ error: 'Email already exists', })
      } else {
        res.send({success: true});
      }
    });
  }

  /**
  * POST /account/password
  * Update current password.
  */
  exports.postUpdatePassword = (req, res, next) => {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
      req.flash('errors', errors);
      return res.redirect('/account');
    }

    User.findById(req.user.id, (err, user) => {
      if (err) { return next(err); }
      user.password = req.body.password;
      user.save((err) => {
        if (err) { return next(err); }
        req.flash('success', { msg: 'Password has been changed.' });
        res.redirect('/account');
      });
    });
  };

  /**
  * POST /account/delete
  * Delete user account.
  */
  exports.postDeleteAccount = (req, res, next) => {
    User.remove({ _id: req.user.id }, (err) => {
      if (err) { return next(err); }
      req.logout();
      req.flash('info', { msg: 'Your account has been deleted.' });
      res.redirect('/');
    });
  };

  /**
  * GET /account/unlink/:provider
  * Unlink OAuth provider.
  */
  exports.getOauthUnlink = (req, res, next) => {
    const provider = req.params.provider;
    User.findById(req.user.id, (err, user) => {
      if (err) { return next(err); }
      user[provider] = undefined;
      user.tokens = user.tokens.filter(token => token.kind !== provider);
      user.save((err) => {
        if (err) { return next(err); }
        req.flash('info', { msg: `${provider} account has been unlinked.` });
        res.redirect('/account');
      });
    });
  };

  /**
  * GET /reset/:token
  * Reset Password page.
  */
  exports.getReset = (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }
    User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec((err, user) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
        return res.redirect('/forgot');
      }
      res.render('account/reset', {
        title: 'Password Reset'
      });
    });
  };

  /**
  * POST /reset/:token
  * Process the reset password request.
  */
  exports.postReset = (req, res, next) => {
    req.assert('password', 'Password must be at least 4 characters long.').len(4);
    req.assert('confirm', 'Passwords must match.').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
      req.flash('errors', errors);
      return res.redirect('back');
    }

    async.waterfall([
      function (done) {
        User
        .findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires').gt(Date.now())
        .exec((err, user) => {
          if (err) { return next(err); }
          if (!user) {
            req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
            return res.redirect('back');
          }
          user.password = req.body.password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          user.save((err) => {
            if (err) { return next(err); }
            req.logIn(user, (err) => {
              done(err, user);
            });
          });
        });
      },
      function (user, done) {
        const to_email = new helper.Email(user.email);
        const from_email = new helper.Email('donotreply@storytime.com');
        const subject = 'Your password has been changed';
        const content = new helper.Content('text/plain', `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`);
        const mail = new helper.Mail(from_email, subject, to_email, content);

        const request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON(),
        });

        sg.API(request, function(error, response) {
          if(error){
            req.flash('info', { msg: `An error occured.` });
            done(error);
          } else {
            req.flash('success', { msg: 'Success! Your password has been changed.' });
            done(error);
          }
        });
      }
    ], (err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  };

  /**
  * GET /forgot
  * Forgot Password page.
  */
  exports.getForgot = (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }
    res.render('account/forgot', {
      title: 'Forgot Password'
    });
  };

  /**
  * POST /forgot
  * Create a random token, then the send user an email with a reset link.
  */
  exports.postForgot = (req, res, next) => {

    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    const errors = req.validationErrors();

    if (errors) {
      req.flash('errors', errors);
      return res.redirect('/forgot');
    }

    async.waterfall([
      function (done) {
        crypto.randomBytes(16, (err, buf) => {
          const token = buf.toString('hex');
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email }, (err, user) => {
          if (!user) {
            req.flash('errors', { msg: 'Account with that email address does not exist.' });
            return res.redirect('/forgot');
          }
          user.passwordResetToken = token;
          user.passwordResetExpires = Date.now() + 3600000; // 1 hour
          user.save((err) => {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        const subs = [
          {
            text:'-resetUrl-',
            value: `${req.headers.host}/reset/${token}`
          }
        ]
        MessagingUtil.sendTemplatePromise('resetPassword', user.email, subs).then(function(res){
          console.log("made it here", res);
          req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
          done(error);
        }).catch(function(err){
          if (err) { return next(err); }
        })
      }
    ], (err) => {
      if (err) { return next(err); }
      res.redirect('/forgot');
    });
  }
