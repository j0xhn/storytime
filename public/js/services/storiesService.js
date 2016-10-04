angular.module('services')
.service('storiesService', function ($http, $q, analyticService) {
  var ss = {};
  ss.cachedStories = [];
  ss.selectedStory;

  ss.postStory = function(storyObj) {
    storyObj._csrf = window._csrf;
    return $http({
      method: 'POST',
      data: storyObj,
      url: '/story/submit'
    }).catch(function(res){
      analyticService.error('postStory', 'storiesService.js')
      console.error(res);
    })
  };

  ss.searchStories = function(searchObj) {
    return $http({
      method: 'GET',
      url: '/stories/search',
      params: searchObj
    }).catch(function(res){
      analyticService.error('searchStories', 'storiesService.js')
      console.error(res);
    })
  };

  ss.bindKeywords = function(storyString, bind){
    const sp = [ '{','<b ng-bind="'];
    const ep = ['}','"></b>'];
    return storyString
      .replace(new RegExp( bind ? sp[0] : sp[1], 'g'), bind ? sp[1] : sp[0])
      .replace(new RegExp( bind ? ep[0] : ep[1], 'g'), bind ? ep[1] : ep[0])
  }

  /*
  'a'lways returns only 1 story
  it will either be a cached story,
  or will go retrieve the id of the
  story requested if not in cached
  */
  ss.getSelectedStory = function(id){

    var deferred = $q.defer();
    if (ss.selectedStory){
      // if looking for something particular
      // then needs to match locally or possibly in cache
      if (id){
        if (ss.selectedStory._id === id) deferred.resolve(ss.selectedStory);
        if (-1 < ss.cachedStories.indexOf(id)) deferred.resolve(ss.cachedStories[ss.cachedStories.indexOf(id)]);
      } else {
        // if exists cached Story, then just return that
        return ss.selectedStory
      }
    } else {
      // if no cached story, then lets do a request for it
      ss.searchStories({_id:id}).then(function(res){
        deferred.resolve(res.data);
      })

    }
    return deferred.promise;
  };

  ss.addToCache = function(storiesToCache){
    ss.cachedStories.concat(storiesToCache)
  };

  ss.setSelectedStory = function(story){
    ss.selectedStory = story;
    ss.addToCache(story);
  };

  ss.getCachedStories = function(){
    return ss.cachedStories;
  };

  return ss;
});
