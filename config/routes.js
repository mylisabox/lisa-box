'use strict'

const footprintsConfig = require('./footprints')
const Joi = require('joi')

/**
 * Routes Configuration
 * (trails.config.routes)
 *
 * Configure how routes map to views and controllers.
 *
 * @see http://trailsjs.io/doc/config/routes.js
 */
module.exports = [
  {
    method: 'GET',
    path: '/isAlive',
    handler: 'DefaultController.isAlive'
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/favorite`,
    handler: 'FavoritesController.getFavorite'
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/room/{id}/devices`,
    handler: 'RoomController.findAssociation'
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/device`,
    handler: 'DeviceController.find'
  },
  {
    method: 'PUT',
    path: `${footprintsConfig.prefix}/favorite/{id}`,
    handler: 'FavoritesController.putFavorite',
    config: {
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: `${footprintsConfig.prefix}/favorite/{id}`,
    handler: 'FavoritesController.destroyFavorite',
    config: {
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/image/{plugin}/{device}/{controller}/{action}`,
    handler: 'PluginController.image',
    config: {
      validate: {
        params: Joi.object({
          plugin: Joi.string().required(),
          controller: Joi.string().required(),
          action: Joi.string().required(),
          device: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/streaming/{plugin}/{device}/{controller}/{action}`,
    handler: 'PluginController.video',
    config: {
      validate: {
        params: Joi.object({
          plugin: Joi.string().required(),
          controller: Joi.string().required(),
          action: Joi.string().required(),
          device: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'POST',
    path: `${footprintsConfig.prefix}/plugins/{plugin}/{device}/{controller}/{action}`,
    handler: 'PluginController.setValue',
    config: {
      validate: {
        params: Joi.object({
          plugin: Joi.string().required(),
          controller: Joi.string().required(),
          action: Joi.string().required(),
          device: Joi.string().required()
        }),
        payload: Joi.object({
          key: Joi.string().required(),
          value: Joi.any().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/dashboard/room/{roomId?}`,
    handler: 'DashboardController.getOrderedDeviceForRoom',
    config: {
      validate: {
        params: Joi.object({
          roomId: Joi.string()
        })
      }
    }
  },
  {
    method: 'POST',
    path: `${footprintsConfig.prefix}/dashboard/room/{roomId?}`,
    handler: 'DashboardController.saveDevicesOrderForRoom',
    config: {
      validate: {
        params: Joi.object({
          roomId: Joi.string()
        }),
        payload: Joi.array()
      }
    }
  }
]
