angular.module('services')
.service('analyticService', function () {
  // load google analytics on layout.jade
  return {
    event: function(category, action, label){
      ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: action,
        eventLabel: label
      });
    },
    error: function(action, label){
      console.error(category, action, label)
      ga('send', {
        hitType: 'event',
        eventCategory: 'error',
        eventAction: action,
        eventLabel: label
      });
    }
  }
});
