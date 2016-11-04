Element.prototype.querySelectorAllArray = function(query){
  return Array.prototype.slice.call(this.querySelectorAll(query))
}
