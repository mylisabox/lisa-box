

import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'
const manageErrors = require('../utils/error')

/**
 * @module DeviceController
 * @description REST device actions.
 */
export class DeviceController extends Controller {
  createOrUpdateFromFront(req, res) {
    const pluginService = this.app.services.PluginService
    pluginService.callOnPluginDriver('saveDevice', req.body.pluginName, req.body.driver, [req.body])
      .then(device => {
        res.status(200).json(device)
      })
      .catch(error => {
        if (error.code === 'E_VALIDATION') {
          res.status(400).json(error)
        }
        else if (error.code === 'E_NOT_FOUND') {
          res.status(404).json(error)
        }
        else {
          res.status(500).send(res.boom.wrap(manageErrors(this.app, error), 500))
        }
      })
  }

  find(req, res) {
    const options = this.app.packs.express.getOptionsFromQuery(req.query)
    let criteria = this.app.packs.express.getCriteriaFromQuery(req.query)
    const id = req.params.id

    if (id) {
      criteria = id
    }

    this.app.services.DeviceService.findWithFavorites(req.user.id, criteria, options)
      .then(fullDataDevices => res.status(fullDataDevices ? 200 : 404).json(fullDataDevices || {}))
      .catch(error => {
        if (error.code === 'E_VALIDATION') {
          res.status(400).json(error)
        }
        else if (error.code === 'E_NOT_FOUND') {
          res.status(404).json(error)
        }
        else {
          res.status(500).send(res.boom.wrap(manageErrors(this.app, error), 500))
        }
      })
  }
}

