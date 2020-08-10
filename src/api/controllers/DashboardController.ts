

import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

/**
 * @module DashboardController
 * @description Generated Trails.js Controller.
 */
export class DashboardController extends Controller {
  getOrderedDeviceForRoom(req, res) {
    this.app.services.DashboardService.getOrderedDeviceForRoom(parseInt(req.params.roomId) || null, req.user.id)
      .then(dashboard => res.json(dashboard))
      .catch(err => {
        this.log.error(err)
        res.serverError(err)
      })
  }

  saveDevicesOrderForRoom(req, res) {
    this.app.services.DashboardService.saveDevicesOrderForRoom(parseInt(req.params.roomId) || null, req.user.id, req.body)
      .then(dashboard => res.json(dashboard))
      .catch(err => {
        this.log.error(err)
        res.serverError(err)
      })
  }
}

