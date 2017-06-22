'use strict'
/* global describe, it */

const assert = require('assert')
const supertest = require('supertest')

describe('AuthController', () => {
  let request, token, prefix
  before(() => {
    request = supertest('http://localhost:3000')
    prefix = global.app.config.footprints.prefix

  })
  it('should exist', () => {
    assert(global.app.api.services['PassportService'])
    assert(global.app.services['PassportService'])
  })

  it('should return an error on missing passport for registration on /auth/local/register', (done) => {
    request
      .post(prefix + '/auth/local/register')
      .set('Accept', 'application/json') //set header for this test
      .send({ username: 'yoyo' })
      .expect(400)
      .end((err, res) => {
        done(err)
      })
  })

  it('should insert a user on /auth/local/register', (done) => {
    request
      .post(prefix + '/auth/local/register')
      .set('Accept', 'application/json') //set header for this test
      .send({ password: 'adminadmin', email: 'test@test.te' })
      .expect(200)
      .end((err, res) => {
        token = res.body.token
        assert.equal(res.body.redirect, '/')
        assert.equal(res.body.user.id, 1)
        assert.equal(res.body.user.email, 'test@test.te')
        done(err)
      })
  })

  it('should return 403 because a user already exist', (done) => {
    request
      .post(prefix + '/auth/local/register')
      .set('Accept', 'application/json') //set header for this test
      .send({ username: 'yoyo' })
      .expect(403)
      .end((err, res) => {
        done(err)
      })
  })

  it('should log a user on /auth/local', (done) => {
    request
      .post(prefix + '/auth/local')
      .set('Accept', 'application/json') //set header for this test
      .send({ email: 'test@test.te', password: 'adminadmin' })
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.redirect, '/')
        assert.equal(res.body.user.id, 1)
        assert.equal(res.body.user.email, 'test@test.te')
        assert(res.body.token)//JWT token
        done(err)
      })
  })

  it('should retreive data on / with JWT token', (done) => {
    request
      .get(prefix + '/')
      .set('Authorization', `JWT ${token}`)
      .set('Accept', 'application/json') //set header for this test
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.test, 'ok')
        done(err)
      })
  })
})
