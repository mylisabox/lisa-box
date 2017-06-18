const manageErrors = (app, error) => {
  app.log.error(error)
  if (app.env.NODE_ENV !== 'production') {
    app.log.warn('this payload error is return for development purpose only and will be only log on production')
    return error
  }
  return new Error()
}

module.exports = manageErrors
