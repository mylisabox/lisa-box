'use strict'

const Controller = require('trails-controller')

/**
 * @module DefaultController
 * @description Default controller.
 */
module.exports = class DefaultController extends Controller {
  /**
   * Simple method to check if server is alive or not
   * @param req
   * @param res
   */
  isAlive(req, res) {
    res.json({alive: true})
  }

  /**
   * Use for test only
   * @param req
   * @param res
   */
  test(req, res) {
    res.json({test: 'ok'})
  }
}

