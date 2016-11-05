Element.prototype.querySelectorAllArray = function(query){
  return Array.prototype.slice.call(this.querySelectorAll(query))
}

Element.prototype.convertToString = function(){
  var tmp = document.createElement("span");
  tmp.appendChild(this);
  return tmp.innerHTML;
}

Element.prototype.replaceWith = function(newElm){
  var tmp = document.createElement("span");
  tmp.appendChild(this);
  tmp.replaceChild(newElm, this);
  debugger
}
