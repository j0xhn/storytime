window.onload = function () {
  if(!window.angular){
    const inputs = $('.input');
    inputs.each((index, input)=>{
      if(input.value){input.classList.add('ng-not-empty')};
      input.addEventListener('blur', function(){
        if (this.value) {
          this.classList.add("ng-not-empty");
        } else {
          this.classList.remove("ng-not-empty");
        }
      })
    });
  }
}
