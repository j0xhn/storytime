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
  const sampleStory = {
    title: "Preperation for the Sun",
    desc: "Sunblock and hats save the day when Intense Sunlight is needed to fight off bad guys",
    photoUrl:"http://worldartsme.com/images/small-sun-clipart-1.jpg",
    author: 'Michelle Storey',
    price: 1,
    tags: ['friend','vehicle','sunscreen','sunblock','darkness','sunlight'],
    inputs:{
      main:       { title:'Main Character', type: 'text'},
      sub:        { title:'Friend of Main Character',type: 'text'},
      vehicle:    { title:'Favorite Vehicle',type: 'text'},
      vgroup:     { title:'Type of Monster',type: 'text'},
      vvehicle:   { title:"Monster's Vehicle",type: 'text'}
    },
    html:'In a small village lived a little boy/girl <b ng-bind="main"></b> and his friend  <b ng-bind="sub"></b>.  <b ng-bind="main"></b> was an apprentice learning how to make weapons in a blacksmith shop.  He worked long hours to make his swords and arrows just right and his/her friend often liked to watch and help. <br><br> One night while <b ng-bind="main"></b> was up working well past the time his friend had gone to bed, there was a loud disturbance outside.  <b ng-bind="main"></b> looked out the door and up the street to see a large band of <b ng-bind="vgroup"></b>s coming down the street.  <b ng-bind="main"></b> grabbed some of his/her finest weapons and charged into battle.  It wasn&#39;t long til <b ng-bind="sub"></b> was fighting right by his side.  "I thought you were in bed!?" <b ng-bind="main"></b> said.  <br/><br/>"How could I sleep with all this noise? And besides, I wasn&#39;t about to let you have all the fun!" <b ng-bind="sub"></b> said while wielding a sword at an oncoming <b ng-bind="vgroup"></b>.<br/><br/>There was a loud "boom" and right in the middle of the street appeared an old man with a long beard.  The <b ng-bind="vgroup"></b>s seemed to recognize him and immediately started running from the street.  "Take a hostage!," one of the <b ng-bind="vgroup"></b>&#39;s yelled as they all headed for the hills.<br/><br/>"<b ng-bind="sub"></b>" gasped <b ng-bind="main"></b> "where&#39;s my friend?" he shouted, "<b ng-bind="main"></b>!"  He heard <b ng-bind="sub"></b> screaming out his/her name as he saw his friend being carried off by the the <b ng-bind="vgroup"></b> in their <b ng-bind="vvehicle"></b>s.  <br/><br/><b ng-bind="main"></b> ran after the <b ng-bind="vgroup"></b>s but they were too fast.  He would never catch them on foot.  <br/><br/>The old man who had appeared out of thin air in the middle of the battle said, "If you want to get your friend back, we&#39;ll need to gather some supplies.  I have a powerful weapon we can use against them to get him/her back."<br/><br/>"Who are you?" <b ng-bind="main"></b> asked.  <br/><br/>"You can call me Bolt" the man replied.  I have power over light and electricity. <br/><br/>Those bully <b ng-bind="vgroup"></b>s hate the light and we can use it get your friend back."<br/><br/>"Then you know where they have taken him/her?" <b ng-bind="main"></b> asked hopefully.<br/><br/>"Yes, to the caves of darkness."  Bolt replied. "But if you are going to come with me, you will need to be prepared for intense brightness.  You will need sunglasses, sunscreen, and a hat.  And Hurry! We need to leave right away!"<br/><br/><b ng-bind="main"></b> quickly ran to his workshop and shoved a bottle of sunscreen into his backpack along with his sunglasses and his cap.  When he ran back out to the street.  Bolt was waiting for him in his awesome <b ng-bind="vehicle"></b>.  "Hop in!" Bolt said.  <br/><br/><b ng-bind="main"></b> jumped right in and got to work applying sunscreen to all of his skin while they drove to the caves of darkness.<br/><br/>Once they got arrived.  They walked right up to the entrance of the cave and Bolt pulled a beautiful sword from it&#39;s sheath at his hip.  He swung it through the air a few times and it began to glow.  "Hand over <b ng-bind="sub"></b>!" He yelled to the <b ng-bind="vgroup"></b>s.  They did nothing so Bolt turned and nodded at <b ng-bind="main"></b>, which was a the signal to put on his sunglasses and hat.  <b ng-bind="main"></b> quickly put them on and Bolt plunged the sword into the ground of cave.  Light burst out through the crack in the ground where the sword had hit.  Light so intense and bright that the <b ng-bind="vgroup"></b>s all screamed and covered their eyes.  Their skin started to sizzle and burn.  As they crumpled helpless to the ground under the intense light.  <b ng-bind="main"></b> ran through the cave and found his friend.  She/he couldn&#39;t see because she/he didn&#39;t have sunglasses so <b ng-bind="main"></b> picked her up and gave her/him his/her hat for some protection from the bright light as he/she ran out of the cave.  <br/><br/>Once they were safely out, Bolt removed his sword from the ground and followed them out to the <b ng-bind="vehicle"></b>.  <b ng-bind="sub"></b> was luckily wearing long sleeves and pants and with the addition of <b ng-bind="main"></b>&#39;s hat, she/he had not been burned by the bright light. <br/><br/>"What was that?" <b ng-bind="sub"></b> asked. <br/><br/>"Intensified sunlight." Bolt responded as he drove them back to their village.  I don&#39;t think you&#39;ll have anymore problems from those <b ng-bind="vgroup"></b>&#39;s now.  <br/><br/>They thanked Bolt for his help and told him he was welcome to come visit them anytime.  He said it was his pleasure to help and disappeared in a flash of light.<br/><br/><b ng-bind="main"></b> and <b ng-bind="sub"></b> were happy to be home again and after seeing how much damage that intense sunlight could do.  They always applied sunscreen and wore sunglasses and hats whenever they were in the sun.   The End.'
  };
  const story = new Story(sampleStory);
  Story.findOne({ title: sampleStory.title }, (err, existingStory) => {
    if (existingStory) {
      console.log('error')
      res.send({error: 'title already exists'})
    } else {
      story.save((err) => {
        if (err) { return next(err); }
      });
      console.log('saved')
      res.send({title: 'response from server'})
    }
  });

  // req.assert('email', 'Email is not valid').isEmail();
  // req.assert('password', 'Password must be at least 4 characters long').len(4);
  // req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  // req.sanitize('email').normalizeEmail({ remove_dots: false });
  //
  // const errors = req.validationErrors();
  //
  // if (errors) {
  //   req.flash('errors', errors);
  //   return res.redirect('/signup');
  // }
  //
  // const user = new User({
  //   email: req.body.email,
  //   password: req.body.password
  // });
  //
  // User.findOne({ email: req.body.email }, (err, existingUser) => {
  //   if (existingUser) {
  //     req.flash('errors', { msg: 'Account with that email address already exists.' });
  //     return res.redirect('/signup');
  //   }
  //   user.save((err) => {
  //     if (err) { return next(err); }
  //     req.logIn(user, (err) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       res.redirect('/');
  //     });
  //   });
  // });
};
