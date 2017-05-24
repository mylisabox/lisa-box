'use strict'

const Controller = require('trails/controller')
const manageErrors = (app, error) => {
  app.log.error(error)
  if (app.env.NODE_ENV !== 'production') {
    app.log.warn('this payload error is return for development purpose only and will be only log on production')
    return error
  }
  return new Error()
}

/**
 * @module RoomController
 * @description REST device actions.
 */
module.exports = class RoomController extends Controller {
  findAssociation(req, res) {
    const footprintService = this.app.services.FootprintService
    const favoritesService = this.app.services.FavoritesService
    const options = this.app.packs.express.getOptionsFromQuery(req.query)
    const criteria = this.app.packs.express.getCriteriaFromQuery(req.query)
    const parentModel = 'room'
    const parentId = req.params.id
    const childAttribute = 'devices'
    const childId = req.params.childId
    let response
    if (childId) {
      response = footprintService.findAssociation(parentModel,
        parentId, childAttribute, childId, options)
        .then(devices => favoritesService.populateFavorite(req.user.id, devices))
    }
    else {
      response = footprintService.findAssociation(parentModel,
        parentId, childAttribute, criteria, options)
        .then(devices => favoritesService.populateFavorite(req.user.id, devices))
    }

    response.then(elements => {
      res.status(elements ? 200 : 404).json(elements || {})
    }).catch(error => {
      if (error.code == 'E_VALIDATION') {
        res.status(400).json(error)
      }
      else if (error.code == 'E_NOT_FOUND') {
        res.status(404).json(error)
      }
      else {
        res.status(500).send(res.boom.wrap(manageErrors(this.app, error), 500))
      }
    })
  }
}

