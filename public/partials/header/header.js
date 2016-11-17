window.navigation = {};
window.navigation.toggleSideNav = function(){};
window.navigation.toggleScreenLock = function(){};
window.navigation.clear = function(){};

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
