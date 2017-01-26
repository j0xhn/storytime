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

}
UpdateUtil.updateUser = function(){
  const updateVersion = 1;
  const updateObject = { $set: { __v: updateVersion }};

  User.find(function(err, users){
    let updateCount = 0;
    let successCount = 0;
    let totalCount  = users.length;
    users.forEach(function(user){
      if(!user.__v || user.__v !== updateVersion){
        updateCount++;
        User.update(
          {_id: user._id},
          updateObject,
          (err, res) => {
            if(err){console.error(err)}
            else{ successCount++ }
          }
        );
      }
    })
    console.log(`${updateCount}/${totalCount} users updated with ${successCount/updateCount || 100}% success`)
  })
};

module.exports = UpdateUtil;
