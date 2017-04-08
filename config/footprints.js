const controllerNames = Object.keys(require('../api/controllers'))

controllerNames[controllerNames.length] = 'AuthController'

/**
 * Footprints Configuration
 * (config.footprints)
 *
 * Footprints are routes that are auto-generated from your model and controller
 * definitions in api/controllers and api/models.
 *
 * @see http://trailsjs.io/doc/config/footprints
 */
module.exports = {

  /**
   * Generate routes for controller handlers.
   */
  controllers: {ignore: controllerNames},

  /**
   * Generate conventional Create, Read, Update, and Delete (CRUD) routes for
   * each Model.
   */
  models: {
    options: {

      /**
       * The max number of objects to return by default. Can be overridden in
       * the request using the ?limit argument.
       */
      defaultLimit: 200,

      /**
       * Whether to populate all model associations by default (for "find")
       */
      populate: false
    },

    actions: {
      create: true,
      find: true,
      update: true,
      destroy: true,

      /**
       * Specify which "association" endpoints to activate.
       */
      createAssociation: true,
      findAssociation: true,
      updateAssociation: true,
      destroyAssociation: true
    }
  },

  /**
   * Prefix your footprint routes
   */
  prefix: '/api/v1'
}
