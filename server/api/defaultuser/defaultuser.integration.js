'use strict';

var app = require('../..');
var request = require('supertest');

var newDefaultuser;

describe('Defaultuser API:', function() {

  describe('GET /api/defaultuser', function() {
    var defaultusers;

    beforeEach(function(done) {
      request(app)
        .get('/api/defaultuser')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          defaultusers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(defaultusers).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/defaultuser', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/defaultuser')
        .send({
          name: 'New Defaultuser',
          info: 'This is the brand new defaultuser!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newDefaultuser = res.body;
          done();
        });
    });

    it('should respond with the newly created defaultuser', function() {
      expect(newDefaultuser.name).to.equal('New Defaultuser');
      expect(newDefaultuser.info).to.equal('This is the brand new defaultuser!!!');
    });

  });

  describe('GET /api/defaultuser/:id', function() {
    var defaultuser;

    beforeEach(function(done) {
      request(app)
        .get('/api/defaultuser/' + newDefaultuser._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          defaultuser = res.body;
          done();
        });
    });

    afterEach(function() {
      defaultuser = {};
    });

    it('should respond with the requested defaultuser', function() {
      expect(defaultuser.name).to.equal('New Defaultuser');
      expect(defaultuser.info).to.equal('This is the brand new defaultuser!!!');
    });

  });

  describe('PUT /api/defaultuser/:id', function() {
    var updatedDefaultuser

    beforeEach(function(done) {
      request(app)
        .put('/api/defaultuser/' + newDefaultuser._id)
        .send({
          name: 'Updated Defaultuser',
          info: 'This is the updated defaultuser!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDefaultuser = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDefaultuser = {};
    });

    it('should respond with the updated defaultuser', function() {
      expect(updatedDefaultuser.name).to.equal('Updated Defaultuser');
      expect(updatedDefaultuser.info).to.equal('This is the updated defaultuser!!!');
    });

  });

  describe('DELETE /api/defaultuser/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/defaultuser/' + newDefaultuser._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when defaultuser does not exist', function(done) {
      request(app)
        .delete('/api/defaultuser/' + newDefaultuser._id)
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
