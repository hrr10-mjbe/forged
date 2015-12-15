'use strict';

var app = require('../..');
var request = require('supertest');

var newBadge;

describe('Badge API:', function() {

  describe('GET /api/badges', function() {
    var badges;

    beforeEach(function(done) {
      request(app)
        .get('/api/badges')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          badges = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(badges).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/badges', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/badges')
        .send({
          name: 'New Badge',
          info: 'This is the brand new badge!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBadge = res.body;
          done();
        });
    });

    it('should respond with the newly created badge', function() {
      expect(newBadge.name).to.equal('New Badge');
      expect(newBadge.info).to.equal('This is the brand new badge!!!');
    });

  });

  describe('GET /api/badges/:id', function() {
    var badge;

    beforeEach(function(done) {
      request(app)
        .get('/api/badges/' + newBadge._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          badge = res.body;
          done();
        });
    });

    afterEach(function() {
      badge = {};
    });

    it('should respond with the requested badge', function() {
      expect(badge.name).to.equal('New Badge');
      expect(badge.info).to.equal('This is the brand new badge!!!');
    });

  });

  describe('PUT /api/badges/:id', function() {
    var updatedBadge

    beforeEach(function(done) {
      request(app)
        .put('/api/badges/' + newBadge._id)
        .send({
          name: 'Updated Badge',
          info: 'This is the updated badge!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBadge = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBadge = {};
    });

    it('should respond with the updated badge', function() {
      expect(updatedBadge.name).to.equal('Updated Badge');
      expect(updatedBadge.info).to.equal('This is the updated badge!!!');
    });

  });

  describe('DELETE /api/badges/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/badges/' + newBadge._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when badge does not exist', function(done) {
      request(app)
        .delete('/api/badges/' + newBadge._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
