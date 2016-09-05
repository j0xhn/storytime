angular.module('services')
.service('storiesService', function ($http, $q) {
  var ss = {};
  ss.cachedStories = [];
  ss.selectedStory;
  ss.exampleStory = {
    "_id" : "example",
    "updatedAt" : new Date("2016-08-22T14:37:17.193Z"),
    "createdAt" : new Date("2016-08-22T14:37:17.193Z"),
    "inputs" : {
        "keyword" : {
            "keyword" : "keyword",
            "title" : "Sample Label"
        }
    },
    "html" : "Write your story here.  Include your interactive keywords with square brackets like such: <b ng-bind=\"keyword\"></b>",
    "title" : "Test Story Title",
    "photoUrl" : "/images/local_500x500.jpg",
    "price" : 1,
    "ages" : "3-5",
    "length" : 5,
    "shortDesc" : "Speedy McQueen takes some lucky kids on a trip!",
    "longDesc" : "Long Desc: Speedy McQueen takes some lucky kids on a trip! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "authorName" : "Guest Author",
    "authorId" : "57bb0e1471cccefeccc6dfb5",
    "tags" : [
        "test",
        "tags",
        "hipster's dream",
        "w13rd ch@rc!ers"
    ],
    "__v" : 0
}

  ss.getStories = function () {
    return $http({
      method: 'GET',
      url: '/stories/all'
    })
  };

  ss.postStory = function(storyObj) {
    storyObj._csrf = window._csrf;
    return $http({
      method: 'POST',
      data: storyObj,
      url: '/story/submit'
    }).catch(function(res){
      console.error(res);
    })
  };

  ss.searchStories = function(searchObj) {
    return $http({
      method: 'GET',
      url: '/stories/search',
      params: searchObj
    })
  };

  /*
  always returns only 1 story
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
        deferred.resolve(res.data.stories[0]);
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
