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
module.exports = UpdateUtil;
