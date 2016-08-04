const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const Story = require('../models/Story');

/**
* POST /signup
* Create a new local account.
*/
exports.postStory = (req, res, next) => {
  const story = new Story(req.body);
  Story.findOne({ title: story.title }, (err, existingStory) => {
    if (existingStory) {
      console.log('error')
      res.send({error: 'Title already exists'})
    } else {
      story.save((err) => {
        if (err) { return next(err); }
      });
      console.log('saved')
      res.send({title: 'Story successfully saved!'})
    }
  })
};

exports.getAllStories = (req, res, next) => {
  console.log('getting stories');
  Story.find({}).exec(function(err, stories){
    console.log(stories)
    res.send({stories: stories});
    // res.render('account/users', { users: users });
  });
};
