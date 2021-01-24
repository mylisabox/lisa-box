'use strict'


const request = require('request')
const Controller = require('trails/controller')
const path = require('path')
const supportedLanguage = ['en', 'fr']

/**
 * @module DefaultController
 * @description Default controller.
 */
module.exports = class DefaultController extends Controller {
  /**
   *
   */
  isInitialized(req, res) {
    this.app.orm.User.findAll().then(users => {
      res.json({ initialized: users && users.length > 0 })
    }).catch(err => {
      res.status(500).end()
    })
  }

  /**
   * Simple method to check if server is alive or not
   * @param req
   * @param res
   */
  isAlive(req, res) {
    res.json({ alive: true })
  }

  proxy(req, res) {
    const reqStream = request({uri: decodeURIComponent(req.query.url), headers: req.headers, method: req.method, json: req.body}, err => {
      if (err) {
        this.log.error(err)
        res.status(500).end()
      }
    })
    req.connection.on('close', () => {
      reqStream.abort()
    })
    reqStream.pipe(res)
  }

  /**
   * Use for test only
   * @param req
   * @param res
   */
  test(req, res) {
    res.json({ test: 'ok' })
  }
}

