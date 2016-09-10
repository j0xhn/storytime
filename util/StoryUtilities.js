const Story = require('../models/Story');

const StoryUtilities = {};
StoryUtilities.getFormatedStoryQuery = function(query){
  console.log('starting query:', query);

  const formatedQuery = {};
  let returnedQuery;

  if (Object.keys(query).length === 0){
    returnedQuery = Story.find({})
  } else {
    // db.stories.aggregate({$match: {$or: [{tags: "first"},{title: "Test Story Title"}]}})
    const titleQuery = {title: new RegExp(query.general, "i")};
    const tagQuery = {tags: query.general};
    returnedQuery = Story.aggregate({$match: {$or:[titleQuery, tagQuery]}});
  }
  // console.log('ending query:', returnedQuery);
  return returnedQuery;
};
module.exports = StoryUtilities;
