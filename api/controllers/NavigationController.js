'use strict'

const Controller = require('trails-controller')
const ng2 = require('@angular/core')
const ng2U = require('angular2-universal')
const ng2Router = require('@angular/router')
const ngApp = require('../../dist/app/app')
const ngRoutes = require('../../dist/app/app.routes')
//const AUTH_PROVIDERS = require('../../dist/app/services/authentication.service').AUTH_PROVIDERS
//const NODE_WEBSOCKET_PROVIDERS = require('../../dist/app/services/websocket.back.service').NODE_WEBSOCKET_PROVIDERS

/**
 * @module NavigationController
 * @description Controller to manage pages.
 */
module.exports = class NavigationController extends Controller {
  _buildOptions(originalUrl) {
    return {
      directives: [ngApp.AppComponent],

      platformProviders: [
        ng2.provide(ng2U.ORIGIN_URL, {useValue: 'http://localhost:3000'}),
        ng2.provide(ng2U.BASE_URL, {useValue: '/'})

      ].concat(ng2U.NODE_HTTP_PROVIDERS, ng2U.NODE_LOCATION_PROVIDERS),

      providers: [
        ng2.provide(ng2U.REQUEST_URL, {useValue: originalUrl || '/'}),
        ng2Router.provideRouter(ngRoutes.routes),
        ng2U.NODE_PLATFORM_PIPES,
        ng2U.NODE_ROUTER_PROVIDERS,
        ng2U.NODE_HTTP_PROVIDERS,
        //AUTH_PROVIDERS,
        //NODE_WEBSOCKET_PROVIDERS
      ],

      data: {},

      async: true,

      beautify: true,

      preboot: {
        appRoot: 'app', // we need to manually include the root
        start: true,
        freeze: 'spinner',     // show spinner w button click & freeze page
        replay: 'rerender',    // rerender replay strategy
        buffer: false,          //FIXME if enable, router doesn't work and pages rendered once // client app will write to hidden div until bootstrap complete
        debug: true,
        uglify: true,
        presets: ['keyPress', 'buttonPress', 'focus']
      },

      ngOnRendered: () => {
        this.app.log.debug('RENDER DONE\n')
      },

      ngDoCheck: () => {
        return true
      }
    }
  }
  privateRoutes(req, res) {
    res.render('index', this._buildOptions(req.originalUrl))
  }
  publicRoutes(req, res) {
    res.render('index', this._buildOptions(req.originalUrl))
  }
}

