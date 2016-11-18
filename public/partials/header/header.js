window.navigation = {};
window.navigation.toggleSideNav = function(){};
window.navigation.toggleScreenLock = function(){};
window.navigation.clear = function(){};
/*
  I use the same backdrop for my modals
  as I do for the side-nav bar.
  Because this app is not 100% angular
  the angular code found in my modals listnes to
  the broadcasts when backdrop is clicked.

  All functions need to be defined pre-DOMContentLoaded
  so that the HTML doesn't throw error, but then renamed below
  so that we have access to the angular instance
*/

document.addEventListener("DOMContentLoaded", function() {
  var $rootScope = angular.element('body').scope().$root

  window.navigation.toggleSideNav = function(force){
    const isForced = typeof force === 'boolean';
    if (isForced){
      document.getElementById('sideNav').classList.toggle('open', force);
      window.navigation.toggleScreenLock(force);
    } else {
      document.getElementById('sideNav').classList.toggle('open');
      window.navigation.toggleScreenLock();
    }
  }
  window.navigation.toggleScreenLock = function(force){
    if(force){document.body.classList.toggle('lock');}
    else{document.body.classList.toggle('lock', force);}
  }
  window.navigation.clear = function(){
    window.navigation.toggleSideNav(false);
    $rootScope.$broadcast('BACKDROP_CLICKED');
  }

  document.getElementById('globalSearch').addEventListener("keyup", function(e){
    if (e.keyCode == 13) {
      location.href = '/stories?search=' + e.target.value;
    }
  })
});
