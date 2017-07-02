'use strict'

/**
 * Policies Configuration
 * (app.config.footprints)
 *
 * Define which prerequisites a request must pass before reaching the intended
 * controller action. By default, no policies are configured for controllers or
 * footprints, therefore the request always will directly reach the intended
 * handler.
 *
 * @see http://trailsjs.io/doc/config/policies
 */
module.exports = {
  AuthController: {
    connect: [
      'Passport.jwt'
    ],
    register: [
      'RegisterPolicy.protect'
    ],
    disconnect: [
      'Passport.jwt'
    ],
    logout: [
      'Passport.jwt'
    ]
  },
  DefaultController: {
    'test': ['Passport.jwt']
  },
  IRController: ['Passport.jwt'],
  CameraController: ['Passport.jwt'],
  PluginController: {
    '*': ['Passport.jwt'],
    'image': []
  },
  DashboardController: ['Passport.jwt'],
  FavoritesController: ['Passport.jwt'],
  RoomController: ['Passport.jwt'],
  DeviceController: ['Passport.jwt'],
  FootprintsController: ['Passport.jwt'],
  ChatBotController: ['Passport.jwt']
}
