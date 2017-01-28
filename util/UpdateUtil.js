const Story = require('../models/Story');
const User = require('../models/User');

const UpdateUtil = {};
UpdateUtil.updateStoryPrice = function(){
  Story.find(function(err, stories){
    stories.forEach(function(story){
      console.log(story.price)
    })
  })
};

UpdateUtil.authorName = function(){
  const updateObject = { $set: { authorName: 'Doctor Dogood' }};
  let updateCount = 0;
  let errorCount = 0;
  Story.find(function(err, stories){
    let totalCount  = stories.length;
    stories.forEach(function(story){
      if(story.authorName === 'Guest Author'){
        updateCount++;
        Story.update(
          {_id: story._id},
          updateObject,
          (err, res) => {
            if(err){errorCount++; console.error(err)}
          }
        );
      }
    })
    console.log(`${updateCount}/${totalCount} stories updated with ${errorCount} errors`)
  })
};

UpdateUtil.updateUser = function(){
  const updateVersion = 1;
  const updateObject = { $set: { __v: updateVersion }};

  User.find(function(err, users){
    let updateCount = 0;
    let errorCount = 0;
    let totalCount  = users.length;
    users.forEach(function(user){
      if(!user.__v || user.__v !== updateVersion){
        updateCount++;
        User.update(
          {_id: user._id},
          updateObject,
          (err, res) => {
            if(err){errorCount++; console.error(err)}
          }
        );
      }
    })
    console.log(`${updateCount}/${totalCount} users updated with ${errorCount} errors`)
  })
};

module.exports = UpdateUtil;
