
//Add method to strings
String.prototype.toCamelCase = function() {
  return this.toLowerCase().replace(/(?:_|-)(.)/g, (match, group1) => {
    return group1.toUpperCase()
  })
}
