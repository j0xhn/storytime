const Story = require('../models/Story');

const StoryUtilities = {};
StoryUtilities.getFormatedStoryQuery = function(query){
  console.log('starting query:', query);

  const formatedQuery = {};
  let returnedQuery;

  if (Object.keys(query).length === 0){
    returnedQuery = Story.find({})
  } else {
    // formatedQuery.title = new RegExp(query.general, "i");
    formatedQuery.tags = { "$in" : [query.general]};
    returnedQuery = Story.aggregate({$match: formatedQuery})
  }
  // console.log('ending query:', returnedQuery);
  return returnedQuery;
};
module.exports = StoryUtilities;
