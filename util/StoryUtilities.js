const StoryUtilities = {};
StoryUtilities.getFormatedStoryQuery = function(query){
  // console.log('starting query:', query);
  const formatedQuery = {};
  formatedQuery.title = new RegExp(query.general, "i");
  // console.log('ending query:', formatedQuery);
  return formatedQuery;
};
module.exports = StoryUtilities;
