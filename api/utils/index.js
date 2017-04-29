//Add method to strings
String.prototype.toCamelCase = function () {
  const regex = new RegExp(/(?:_|-)(.)/g)
  if (regex.test(this)) {
    return this.toLowerCase().replace(regex, (match, group1) => {
      return group1.toUpperCase()
    })
  }
  return this + ''
}
