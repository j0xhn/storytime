(function () {
  'use strict';
  window.navigation = {};

  navigation.toggleSideNav = function(){
    document.getElementById('sideNav').classList.toggle('open');
    navigation.toggleScreenLock();
  }
  navigation.toggleScreenLock = function(){ document.body.classList.toggle('lock'); }

  document.getElementById('globalSearch').addEventListener("keyup", function(e){
    if (e.keyCode == 13) {
      location.href = '/stories?search=' + e.target.value;
    }
  })
})()
