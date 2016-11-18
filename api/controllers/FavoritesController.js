'use strict'

const Controller = require('trails-controller')

/**
 * @module FavoriteController
 * @description Favorite REST API
 */
module.exports = class FavoriteController extends Controller {
  getFavorite(req, res) {
    this.app.services.FootprintService.findAssociation('user', req.user.id, 'favorites').then(devices => {
      return res.json(devices)
    }).catch(err => {
      return res.serverError(err)
    })
  }

  putFavorite(req, res) {
    this.app.orm.User.findById(req.user.id).then(user => {
      return user.addFavorite(req.body.id).then(fav => {
        res.json({})
      })
    }).catch(err => {
      return res.serverError(err)
    })
  }

  destroyFavorite(req, res) {
    this.app.orm.User.findById(req.user.id).then(user => {
      return user.removeFavorite(req.params.id).then(fav => {
        res.json({})
      })
    }).catch(err => {
      return res.serverError(err)
    })
  }

}

