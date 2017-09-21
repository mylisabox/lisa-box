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
    path: '*',
    handler: 'DefaultController.default'
  },
  {
    method: 'GET',
    path: '/',
    handler: {
      directory: {
        path: 'node_modules/lisa-ui/bundle-en'
      }
    }
  }, /*
  {
    method: 'GET',
    path: '/fr',
    handler: {
      directory: {
        path: 'node_modules/lisa-ui/bundle-fr'
      }
    }
  },*/
  {
    method: 'POST',
    path: `${footprintsConfig.prefix}/{model}`,
    handler: 'FootprintController.create'
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/{model}/{id?}`,
    handler: 'FootprintController.find'
  },
  {
    method: ['PUT', 'PATCH'],
    path: `${footprintsConfig.prefix}/{model}/{id?}`,
    handler: 'FootprintController.update'
  },
  {
    method: 'DELETE',
    path: `${footprintsConfig.prefix}/{model}/{id?}`,
    handler: 'FootprintController.destroy'
  },
  {
    method: 'POST',
    path: `${footprintsConfig.prefix}/{parentModel}/{parentId}/{childAttribute}`,
    handler: 'FootprintController.createAssociation'
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/{parentModel}/{parentId}/{childAttribute}/{childId?}`,
    handler: 'FootprintController.findAssociation'
  },
  {
    method: 'PUT',
    path: `${footprintsConfig.prefix}/{parentModel}/{parentId}/{childAttribute}/{childId?}`,
    handler: 'FootprintController.updateAssociation'
  },
  {
    method: 'DELETE',
    path: `${footprintsConfig.prefix}/{parentModel}/{parentId}/{childAttribute}/{childId?}`,
    handler: 'FootprintController.destroyAssociation'
  },
  {
    method: 'GET',
    path: '/isAlive',
    handler: 'DefaultController.isAlive'
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/initialized`,
    handler: 'DefaultController.isInitialized'
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
    method: 'POST',
    path: `${footprintsConfig.prefix}/device`,
    handler: 'DeviceController.createOrUpdateFromFront'
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/plugin`,
    handler: 'PluginController.find'
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/plugin/search`,
    handler: 'PluginController.search'
  },
  {
    method: 'POST',
    path: `${footprintsConfig.prefix}/plugin/{id}/drivers/{driver}/pairing`,
    handler: 'PluginController.pairing'
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/plugin/{id}/drivers/{driver}/devices`,
    handler: 'PluginController.getDevicesForPairing'

  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/plugin/{id}/images/{name}/{subname?}`,
    handler: 'PluginController.image',
    config: {
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required(),
          subname: Joi.string()
        })
      }
    }
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
    method: 'POST',
    path: `${footprintsConfig.prefix}/plugins/{plugin}/{device}`,
    handler: 'PluginController.setValue',
    config: {
      validate: {
        params: Joi.object({
          plugin: Joi.string().required(),
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
    method: 'POST',
    path: `${footprintsConfig.prefix}/devices/group/{roomId}/{type}`,
    handler: 'PluginController.setGroupValue',
    config: {
      validate: {
        params: Joi.object({
          roomId: Joi.string().required(),
          type: Joi.string().required()
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
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/ir/start`,
    handler: 'IRController.start'
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/ir/stop`,
    handler: 'IRController.stop'
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/ir/quit`,
    handler: 'IRController.quit'
  },
  {
    method: 'POST',
    path: `${footprintsConfig.prefix}/ir/button`,
    handler: 'IRController.quit',
    config: {
      validate: {
        payload: Joi.object({
          button: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/camera/snapshot`,
    handler: 'CameraController.snapshot',
    config: {
      validate: {
        query: Joi.object({
          url: Joi.string().required(),
          token: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/chatbot/userbot`,
    handler: 'ChatBotController.userBot'
  },
  {
    method: 'DELETE',
    path: `${footprintsConfig.prefix}/chatbot/userbot/{id}`,
    handler: 'ChatBotController.deleteUserBot',
    config: {
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'POST',
    path: `${footprintsConfig.prefix}/chatbot/userbot`,
    handler: 'ChatBotController.saveUserBot',
    config: {
      validate: {
        payload: Joi.object({
          name: Joi.string().allow(''),
          displayName: Joi.string().required(),
          data: Joi.object({
            sentences: Joi.array().required(),
            responses: Joi.array().required(),
            commands: Joi.array().required()
          }).required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/camera/stream`,
    handler: 'CameraController.stream',
    config: {
      validate: {
        query: Joi.object({
          url: Joi.string().required(),
          token: Joi.string().required()
        })
      }
    }
  }
]
