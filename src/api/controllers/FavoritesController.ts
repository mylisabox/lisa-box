import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

/**
 * @module FavoriteController
 * @description Favorite REST API
 */
export class FavoritesController extends Controller {
  getFavorite(req, res) {
    this.app.services.FavoritesService.getFavoritesAndSyncData(req.user.id).then(devices => {
      res.json(devices)
    }).catch(err => {
      res.serverError(err)
    })
  }

  putFavorite(req, res) {
    this.app.services.FavoritesService.putFavorite(req.user.id, req.params.id)
      .then(_ => {
        res.json({})
      })
      .catch(err => {
        res.serverError(err)
      })
  }

  destroyFavorite(req, res) {
    this.app.services.FavoritesService.destroyFavorite(req.user.id, req.params.id)
      .then(_ => {
        res.json({})
      })
      .catch(err => {
        res.serverError(err)
      })
  }
}

