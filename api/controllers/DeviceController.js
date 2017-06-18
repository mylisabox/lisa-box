'use strict'

const Controller = require('trails/controller')
const manageErrors = require('../utils/error')

/**
 * @module DeviceController
 * @description REST device actions.
 */
module.exports = class DeviceController extends Controller {
  createOrUpdateFromFront(req, res) {

  }

  find(req, res) {
    const footprintService = this.app.services.FootprintService
    const favoritesService = this.app.services.FavoritesService
    const options = this.app.packs.express.getOptionsFromQuery(req.query)
    const criteria = this.app.packs.express.getCriteriaFromQuery(req.query)
    const id = req.params.id
    let response
    if (id) {
      response = footprintService.find('device', id, options)
        .then(devices => favoritesService.populateFavorite(req.user.id, devices))
    }
    else {
      response = footprintService.find('device', criteria, options)
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

