window.onload = function () {
  if(!window.angular){
    $(document).on('blur', '.input', function () {
      console.log("blur");
      if (this.value) {
        this.classList.add("ng-not-empty");
      } else {
        this.classList.remove("ng-not-empty");
      }
    });
  }
}
