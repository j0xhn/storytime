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

  ss.getKeywordArrayWithType = function(inputArray, type){
    const response = [];
    for (key in inputArray) {
        if (inputArray[key].type === type) { response.push(inputArray[key].keyword)}
    }
    if (response.length === 0) { return null }
    else { return response }

  }
  ss.bindToggleKeywords = function(htmlString, bind) {
    let response;
    const o1phrase = 'ng-hide';
    const o2phrase = 'ng-show';
    const kphrase = 'data-keyword';


    function replaceToggle(htmlString, o1phrase, o2phrase){
      const regex = /\[(.*?)\]/;
      const toggleSections = regex.exec(htmlString);
      if(!toggleSections) {
        response = htmlString;
        return;
      }
      // if a new section is found continue
      const sections = toggleSections[1].split(',');
      const obj = {}
      const parts = sections.map(function(section){
        const ta = section.split(':');
        if (ta[0].trim() === 'k'){ obj.keyword = ta[1]}
        else if (ta[0].trim() === '1'){ obj.option1 = ta[1]}
        else if (ta[0].trim() === '2'){ obj.option2 = ta[1]}
      })
      const element1 = document.createElement('span');
      element1.innerHTML = obj.option1;
      element1.setAttribute(o1phrase, obj.keyword)

      const element2 = document.createElement('span');
      element2.innerHTML = obj.option2;
      element2.setAttribute(o2phrase, obj.keyword)

      const wrapper = document.createElement('span');
      wrapper.setAttribute(kphrase, obj.keyword);
      wrapper.appendChild(element1);
      wrapper.appendChild(element2);

      const tempWrap = document.createElement('span');
      tempWrap.appendChild(wrapper);

      replaceToggle(htmlString.replace(toggleSections[0], tempWrap.innerHTML));
    }

    function reverseToggle(htmlString, o1phrase, o2phrase, kphrase){
      const toggleInputs = {};
      const searchElm = document.createElement('span');
      searchElm.innerHTML = htmlString;

      const option1Arr = searchElm.querySelectorAll(`span [${o1phrase}]`);
      const option2Arr = searchElm.querySelectorAll(`span [${o2phrase}]`);
      const keywordArr = searchElm.querySelectorAll(`span [${kphrase}]`);


      option1Arr.forEach(function(elm){
        const keyword = elm.getAttribute(o1phrase);
        const option1 = elm.innerHTML;
        toggleInputs[keyword] = {keyword: keyword, option1: option1.trim() }
      })

      option2Arr.forEach(function(elm){
        const keyword = elm.getAttribute(o2phrase);
        const option2 = elm.innerHTML;
        toggleInputs[keyword].option2 = option2.trim();
      })

      keywordArr.forEach(function(elm){
        const keyword = elm.getAttribute(kphrase);
        elm.insertAdjacentText('beforeBegin', `[k:${keyword}, 1:${toggleInputs[keyword].option1}, 2: ${toggleInputs[keyword].option2}]`);
        elm.remove();
      })

      response = searchElm.innerHTML;
    }

    if (bind) { replaceToggle(htmlString, o1phrase, o2phrase, kphrase) }
    else { reverseToggle(htmlString, o1phrase, o2phrase, kphrase) }
    return response;
  }

  ss.bindTextKeywords = function(storyString, keywordArray, type, bind){
    // setting bind to true or false is binding or unbinding
      const sp = [ '{','<b ng-bind="'];
      const ep = ['}','"></b>'];
      return storyString
      .replace(new RegExp( bind ? sp[0] : sp[1], 'g'), bind ? sp[1] : sp[0])
      .replace(new RegExp( bind ? ep[0] : ep[1], 'g'), bind ? ep[1] : ep[0])
  }

  ss.replaceTextValues = function(htmlString, textInputArray){
    if (textInputArray.length === 0) return
    for (var i = 0, len = textInputArray.length; i < len; i++) {
      const input = textInputArray[i];
        var inputRegex = new RegExp('"'+input+'"','g');
        htmlString = htmlString.replace(inputRegex,'"storyObj.inputs.'+textInputArray[i]+'.value"')
    }
    return htmlString;
  }

  ss.bindToggleValues = function(htmlString, toggleInputArray){
    console.log('made it here with array:', toggleInputArray)
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

  return ss;
});
