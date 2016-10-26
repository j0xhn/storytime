angular.module('services')
.service('analyticService', function () {
  // load google analytics on layout.jade
  return {
    event: function(category, action, label){
      ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
        userId: userService.user ? userService.user._id : null
      });
    },
    error: function(action, label){
      console.error(action, label)
      ga('send', {
        hitType: 'event',
        eventCategory: 'error',
        eventAction: action,
        eventLabel: label,
        userId: userService.user ? userService.user._id : null
      });
    }
  }
});
