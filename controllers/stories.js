const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const Story = require('../models/Story');
const StoryUtilities = require('../util/StoryUtilities');

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
        if (err) {
          console.log('error: ', err);
          res.send({error: err});
          return next(err);
        } else {
          console.log('saved')
          res.send({title: 'Story successfully saved!'})
        }
      });
    }
  })
};

exports.getAllStories = (req, res, next) => {
  Story.find({}).exec(function(err, stories){
    res.send({stories: stories});
  });
};

exports.searchStories = (req,res,next) => {
  // console.log('query: ',req.query);
  const finalQuery = StoryUtilities.getFormatedStoryQuery(req.query);
  // console.log('final query:', finalQuery);
  finalQuery.exec(function(err, stories){
    // console.log('stories:', stories)
    res.json(stories);
  });
}
