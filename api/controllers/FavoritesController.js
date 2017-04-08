'use strict'

const Controller = require('trails/controller')

/**
 * @module FavoriteController
 * @description Favorite REST API
 */
module.exports = class FavoriteController extends Controller {
  getFavorite(req, res) {
    this.app.services.FavoritesService.getFavorite(req.user.id).then(devices => {
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

