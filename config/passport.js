'use strict'

//Basic configuration for JWT
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const EXPIRES_IN_SECONDS = 60 * 60 * 24
const ALGORITHM = 'HS256'
const ISSUER = 'localhost'
const AUDIENCE = 'localhost'
const SECRET = process.env.TOKEN_SECRET || 'mysupersecuretoken'

module.exports = {
  /**
   * Prefix for Auth routes
   */
  //prefix: '/',
  /**
   * Url redirection on login/logout
   */
  redirect: {
    login: '/',//Login successful
    logout: '/'//Logout successful
  },
  /**
   * Auth strategies allowed
   */
  strategies: {
    local: {
      strategy: require('passport-local').Strategy,
      options: {
        usernameField: 'email'// If you want to enable both username and email just remove this field
      }
    },
    //Enable JWT strategy
    jwt: {
      strategy: JwtStrategy,
      tokenOptions: {
        expiresInSeconds: EXPIRES_IN_SECONDS,
        secret: SECRET,
        algorithm: ALGORITHM,
        issuer: ISSUER,
        audience: AUDIENCE
      },
      options: {
        secretOrKey: SECRET,
        issuer: ISSUER,
        audience: AUDIENCE,
        jwtFromRequest: ExtractJwt.fromAuthHeader() //Authorization: JWT JSON_WEB_TOKEN_STRING
      }
    },
    /*
     //Enable twitter strategy
     twitter: {
      name: 'Twitter',
      protocol: 'oauth',
      strategy: require('passport-twitter').Strategy,
      options: {
        consumerKey: 'your-consumer-key',
        consumerSecret: 'your-consumer-secret'
      }
    },

     //Enable facebook strategy
     facebook: {
      name: 'Facebook',
      protocol: 'oauth2',
      strategy: require('passport-facebook').Strategy,
      options: {
        clientID: 'your-client-id',
        clientSecret: 'your-client-secret',
        scope: ['email'] // email is necessary for login behavior
      }
    },

     //Enable google strategy
     google: {
      name: 'Google',
      protocol: 'oauth2',
      strategy: require('passport-google-oauth').OAuth2Strategy,
      options: {
        clientID: 'your-client-id',
        clientSecret: 'your-client-secret'
      }
    },

     //Enable github strategy
     github: {
      strategy: require('passport-github').Strategy,
      name: 'Github',
      protocol: 'oauth2',
      options: {
        clientID: 'your-client-id',
        clientSecret: 'your-client-secret'
      }
    }
    */
  }
}
