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
        analyticService.event('cache', 'specific id asked for in cache', id);
        if (ss.selectedStory._id === id) deferred.resolve(ss.selectedStory);
        if (-1 < ss.cachedStories.indexOf(id)) deferred.resolve(ss.cachedStories[ss.cachedStories.indexOf(id)]);
      } else {
        // if exists cached Story, then just return that
        analyticService.event('cache', 'default cached story returned', ss.selectedStory._id);
        return ss.selectedStory
      }
    } else {
      // if no cached story, then lets do a request for it
      analyticService.event('cache', 'not cached, needing api call', id);
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

  ss.exampleStory = {
    "_id" : "57ee7ef2002a8c317ffe5c30",
    "updatedAt" : "2016-10-24T03:24:49.763Z",
    "createdAt" : "2016-09-30T15:04:18.034Z",
    "inputs" : {
      "activity" : {
        "type" : "text",
        "title" : "Favorite Activity with Verb",
        "keyword" : "activity",
        "index" : 0
      },
      "hero" : {
        "type" : "text",
        "title" : "Favorite Superhero / Princess",
        "keyword" : "hero",
        "index" : 1
      },
      "parent" : {
        "type" : "text",
        "title" : "Parent's Name",
        "keyword" : "parent",
        "index" : 2
      },
      "child" : {
        "type" : "text",
        "title" : "Child's Name",
        "keyword" : "child",
        "index" : 3
      },
      "gender" : {
        "index" : 4,
        "type" : "toggle",
        "keyword" : "gender",
        "option1" : "boy",
        "option2" : "girl"
      },
      "ending" : {
        "index" : 5,
        "type" : "toggle",
        "keyword" : "ending",
        "option1" : "normal",
        "option2" : "reward"
      }
    },
    "html" : "<p>Once upon a time there lived a big pikachu named <b ng-bind=\"parent\"></b> who had a <span data-keyword=\"gender\"><span ng-hide=\"gender\">rambunctious pikachu named <b ng-bind=\"child\"></b></span><span ng-show=\"gender\">adorable pikachu named <b ng-bind=\"child\"></b></span></span>. &nbsp;</p>\n<p><b ng-bind=\"child\"></b> was extremely fussy. &nbsp;\"NO SLEEPING!\" - he would yell at his mom but secretly deep down he knew he loved to sleep.&nbsp;</p>\n<p><strong>UNTIL ONE DAY!</strong> When the little pikachu couldn't fall asleep! &nbsp;All night whriling and twerling, trying to get to sleep because <b ng-bind=\"child\"></b> knew it was important to get a full nights sleep to be be excellent at school, <b ng-bind=\"activity\"></b>, and be of good health.&nbsp;</p>\n<p>He asked his mom to help, and she knew just the who to call -- <strong><b ng-bind=\"hero\"></b></strong>!</p>\n<p><b ng-bind=\"hero\"></b> read <b ng-bind=\"child\"></b> lots of stories until the littlest pikachu couldn't help but to fall asleep right away. &nbsp;</p>\n<p><span data-keyword=\"ending\"><span ng-hide=\"ending\">The End</span><span ng-show=\"ending\"> <b ng-bind=\"parent\"></b> was so proud that he told <b ng-bind=\"hero\"></b> that they could <b ng-bind=\"activity\"></b> tomrrow when <b ng-bind=\"child\"></b> woke up!</span></span></p>",
    "price" : 1,
    "photoUrl" : "https://s-media-cache-ak0.pinimg.com/564x/da/05/d5/da05d54627148748ec40b13bd17ba886.jpg",
    "title" : "The Very Tired Picachu",
    "ages" : "4+",
    "length" : 2,
    "shortDesc" : "A mother get's her fussy little Pokemon to go to sleep.  She does so with the help of her child's favorite hero and helps them understand that sleeping will help her child be happier at school and while doing their favorite activity.",
    "longDesc" : "",
    "authorName" : "Guest Author",
    "authorId" : "57e894497d466949e782cdf2",
    "tags" : [
      "Pokemon Go",
      "Pokemon",
      "pikachu",
      "picachu",
      "animals",
      "sleep",
      "sleeping"
    ],
    "__v" : 0,
    "underReview" : true
  }

  return ss;
});
