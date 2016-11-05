angular.module('services')
.service('inputService', function ($http, $q, analyticService) {
  var is = {};

  is.bindToggleKeywords = function(htmlString, bind) {
    var response;
    var o1phrase = 'ng-hide';
    var o2phrase = 'ng-show';
    var kphrase = 'data-keyword';

    function bindInputs(htmlString, o1phrase, o2phrase, kphrase){
      // create wrapper and toggle elements
      var searchElm = document.createElement('span');
      htmlString = htmlString.replace(/\[/g, '<toggle>').replace(/\]/g, '</toggle>')
      searchElm.innerHTML = htmlString;
      // get array of nodes we want to manipulate & sort nested first
      var results = searchElm.querySelectorAllArray('toggle');
      results = results.sort(function(a,b){
        var ahc = !!a.querySelectorAllArray('toggle').length
        var bhc = !!b.querySelectorAllArray('toggle').length
        if(ahc && !bhc){
          return 1
        } else if (bhc && !ahc) {
          return -1
        } else {
          return 0
        }
      })
      // convert strings to html nodes
      results.map(function(elm, i, results){
        var sections = elm.innerHTML.split('#');
        var obj = {}
        var parts = sections.map(function(section){
          var ta = section.split(':');
          if (ta[0].trim() === 'k'){ obj.keyword = ta[1].trim()}
          else if (ta[0].trim() === '1'){ obj.option1 = ta[1].trim()}
          else if (ta[0].trim() === '2'){ obj.option2 = ta[1].trim()}
        })
        var element1 = document.createElement('span');
        element1.innerHTML = obj.option1;
        element1.setAttribute(o1phrase, obj.keyword)

        var element2 = document.createElement('span');
        element2.innerHTML = obj.option2;
        element2.setAttribute(o2phrase, obj.keyword)

        elm.innerHTML = '';
        elm.setAttribute(kphrase, obj.keyword);
        elm.appendChild(element1);
        elm.appendChild(element2);
      })

      response = searchElm.innerHTML
    }

    function reverseBindInputs(htmlString, o1phrase, o2phrase, kphrase){
      var toggleInputs = {};
      var searchElm = document.createElement('span');
      searchElm.innerHTML = htmlString;
      var keywordArr = searchElm.querySelectorAllArray(`span [${kphrase}]`);

      keywordArr.forEach(function(elm){
        var o1a = elm.querySelectorAllArray(`span [${o1phrase}]`);
        var o2a = elm.querySelectorAllArray(`span [${o2phrase}]`);
        var o1 = o1a[0].innerHTML;
        var o2 = o2a[o2a.length-1].innerHTML;
        var keyword = elm.getAttribute(kphrase);
        elm.outerHTML = '[k:'+keyword+'#1:'+o1+'#2:'+o2+']';
      })

      response = searchElm.innerHTML;
    }

    if (bind) { bindInputs(htmlString, o1phrase, o2phrase, kphrase) }
    else { reverseBindInputs(htmlString, o1phrase, o2phrase, kphrase) }
    return response;
  }

  is.bindTextKeywords = function(htmlString, bind){
    // setting bind to true or false is binding or unbinding
      var sp = [ '{','<b ng-bind="'];
      var ep = ['}','"></b>'];
      return htmlString
      .replace(new RegExp( bind ? sp[0] : sp[1], 'g'), bind ? sp[1] : sp[0])
      .replace(new RegExp( bind ? ep[0] : ep[1], 'g'), bind ? ep[1] : ep[0])
  }

  is.bindTextValues = function(htmlString, textInputArray){
    if (textInputArray.length === 0) return
    for (var i = 0, len = textInputArray.length; i < len; i++) {
      var input = textInputArray[i];
        var inputRegex = new RegExp('"'+input+'"','g');
        htmlString = htmlString.replace(inputRegex,'"storyObj.inputs.'+textInputArray[i]+'.value"')
    }
    return htmlString;
  }

  is.cleanInputs = function(inputs){
    let index = 0;
    for (var k in inputs){
      let input = inputs[k];

      // TEMPORARY - get legacy up to date
      // for re-ordering legacy stories
      if (!input.hasOwnProperty('index')) { input.index = index; index++; }
      // for adding type of input
      if (!input.hasOwnProperty('type')){ input.type = 'text'}
      // end of temporary

      // if changed / updated
      if (input.keyword && input.keyword != k && !input.temporary){ inputs[input.keyword] = input; delete inputs[k]; }
      // if empty
      if (!input.hasOwnProperty('keyword')){ delete inputs[k] }
      // if added new
      if (input.hasOwnProperty('temporary') ) {
        delete input.temporary;
        inputs[input.keyword] = input;
        delete inputs[k];
      }
    }
    return inputs
  }

  is.prepareForAngular = function(htmlString, inputs){
    var inputsArray = inputs ? Object.keys(inputs) : [];
    if (inputsArray.length === 0) { // if no inputs
      return htmlString
    } else { // if inputs exist
      for (var i = 0, len = inputsArray.length; i < len; i++) {
        var input = inputsArray[i];
        // temporary while not all 13 stories have "type"
        inputs[input].type = inputs[input].type || 'text';
        // end temporary
        var inputRegex = new RegExp('"'+input+'"','g');
        htmlString = htmlString.replace(inputRegex,'"storyObj.inputs.'+inputsArray[i]+'.value"')
      }
      return htmlString
    }
  }

  return is;
});
