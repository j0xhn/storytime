const Story = require('../models/Story');
const User = require('../models/User');

const updateUtil = {};
updateUtil.updateStoryPrice = function(query){
  Story.find().forEach(function(story){
    story.price = story.price ? story.price : 0;
  });
};
module.exports = updateUtil;
