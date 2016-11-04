const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const Story = require('../models/Story');
const StoryUtilities = require('../util/StoryUtilities');
const UserUtil = require('../util/UserUtil');
/**
* POST /signup
* Create a new local account.
*/
exports.postStory = (req, res, next) => {
  let story = req.body;
  if ( story._id && (req.user.id === story.authorId || UserUtil.isAdmin(req.user))){
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
        res.send({savedStoryId: false, success: true});
      });
    } else {
      // check for existing story with conflicting attributes
      // new stories should make it here
      Story.findOne({ title: story.title }, (err, existingStory) => {
        if (existingStory) {
          console.log('error');
          res.send({error: 'Title already exists'});
        } else {
          new Story(story).save((err, story) => {
            if (err) {
              res.send({error: err});
              throw err;
            } else {
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
