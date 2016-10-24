angular.module('services')
.service('inputService', function ($http, $q, analyticService) {
  var is = {};

  is.getKeywordArrayWithType = function(inputArray, type){
    const response = [];
    for (key in inputArray) {
        if (inputArray[key].type === type) { response.push(inputArray[key].keyword)}
    }
    if (response.length === 0) { return null }
    else { return response }

  }

  is.bindToggleKeywords = function(htmlString, bind) {
    let response;
    const o1phrase = 'ng-hide';
    const o2phrase = 'ng-show';
    const kphrase = 'data-keyword';

    function bindInputs(htmlString, o1phrase, o2phrase, kphrase){
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

      bindInputs(htmlString.replace(toggleSections[0], tempWrap.innerHTML), o1phrase, o2phrase, kphrase);
    }
    function reverseBindInputs(htmlString, o1phrase, o2phrase, kphrase){
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
        elm.insertAdjacentText('beforeBegin', `[k:${keyword}, 1:${toggleInputs[keyword].option1}, 2:${toggleInputs[keyword].option2}]`);
        elm.remove();
      })

      response = searchElm.innerHTML;
    }

    if (bind) { bindInputs(htmlString, o1phrase, o2phrase, kphrase) }
    else { reverseBindInputs(htmlString, o1phrase, o2phrase, kphrase) }
    return response;
  }

  is.bindTextKeywords = function(htmlString, bind){
    // setting bind to true or false is binding or unbinding
      const sp = [ '{','<b ng-bind="'];
      const ep = ['}','"></b>'];
      return htmlString
      .replace(new RegExp( bind ? sp[0] : sp[1], 'g'), bind ? sp[1] : sp[0])
      .replace(new RegExp( bind ? ep[0] : ep[1], 'g'), bind ? ep[1] : ep[0])
  }

  is.bindTextValues = function(htmlString, textInputArray){
    if (textInputArray.length === 0) return
    for (var i = 0, len = textInputArray.length; i < len; i++) {
      const input = textInputArray[i];
        var inputRegex = new RegExp('"'+input+'"','g');
        htmlString = htmlString.replace(inputRegex,'"storyObj.inputs.'+textInputArray[i]+'.value"')
    }
    return htmlString;
  }

  return is;
});
