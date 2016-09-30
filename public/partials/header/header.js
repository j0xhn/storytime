(function () {
  'use strict';
  window.navigation = {};

  navigation.toggleSideNav = function(force){
    const isForced = typeof force === 'boolean';
    if (isForced){
      document.getElementById('sideNav').classList.toggle('open', force);
      navigation.toggleScreenLock(force);
    } else {
      document.getElementById('sideNav').classList.toggle('open');
      navigation.toggleScreenLock();
    }
  }
  navigation.toggleScreenLock = function(force){
    if(force){document.body.classList.toggle('lock');}
    else{document.body.classList.toggle('lock', force);}
  }

  document.getElementById('globalSearch').addEventListener("keyup", function(e){
    if (e.keyCode == 13) {
      location.href = '/stories?search=' + e.target.value;
    }
  })
})()
