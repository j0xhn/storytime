const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const mongoose = require('mongoose');
const Story = require('../models/Story');
const Submital = require('../models/Submital');
const StoryUtilities = require('../util/StoryUtilities');
/**
* POST /signup
* Create a new local account.
*/
exports.postStory = (req, res, next) => {
  let story = req.body;

  if ( story._id && (req.user.id === story.authorId)){
    console.log("user is editing existing story");
    // handle editing of existing story,
    // that the id's of the client and the story match
    // check to see if user id's match
    Story.update( { _id: story._id }, story, { upsert: true },
      function (err, result) {
        if (err) {
          res.send({ error: err, })
          throw err;
        }
        console.log('story updated');
        res.send({savedStoryId: false, success: true});
      });
    } else {
      // check for existing story with conflicting attributes
      // new stories should make it here
      Story.findOne({ title: story.title }, (err, existingStory) => {
        if (existingStory) {
          console.error('error: title already exists');
          res.send({error: 'Title already exists'});
        } else {
          new Submital(story).save((err, story) => {
            if (err) {
              res.send({error: err});
              throw err;
            } else {
              console.log('New story submited with id:', story.id);
              res.send({savedStoryId: story.id, success: true});
            }
          });
        }
      })
    }
  }

  exports.searchStories = (req,res,next) => {
    // console.log('query: ',req.query);
    const finalQuery = StoryUtilities.getFormatedStoryQuery(req.query);
    // console.log('final query:', finalQuery);
    finalQuery.exec(function(err, stories){
      res.json(stories);
    });
  }
