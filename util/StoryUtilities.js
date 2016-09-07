const StoryUtilities = {};
StoryUtilities.getFormatedStoryQuery = function(query){
  console.log('starting query:', query);
  const formatedQuery = {};
  formatedQuery.title = new RegExp(query.title);
  console.log('ending query:', formatedQuery);
  return formatedQuery;
};
module.exports = StoryUtilities;
