angular.module('services')
.service('storiesService', function ($http) {
  var cachedStories,
      selectedStory

  return {
    cachedStories: cachedStories,
    selectedStory: function(){
      return selectedStory
    },

    setSelectedStory: function(story){
      selectedStory = story;
    },

    addToCache: function(storiesToCache){
      cachedStories.concat(storiesToCache)
    },
    getStories: function () {
      return $http({
        method: 'GET',
        url: '/stories/all'
      })
    },
    searchStories: function(id) {
      return $http({
        method: 'GET',
        url: '/stories/search',
        params: {
          id: id
        }
      })
    },
    postStory: function(storyObj) {
      storyObj._csrf = window._csrf;
      return $http({
        method: 'POST',
        data: storyObj,
        url: '/story/submit'
      })
    }
  };
});
