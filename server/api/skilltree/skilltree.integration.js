'use strict';

var app = require('../..');
var request = require('supertest');

var newSkilltree;

describe('Skilltree API:', function() {

  //TODO tests

  /*describe('GET /api/skilltree', function() {
    var skilltrees;

    beforeEach(function(done) {
      request(app)
        .get('/api/skilltree')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          skilltrees = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(skilltrees).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/skilltree', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/skilltree')
        .send({
          name: 'New Skilltree',
          info: 'This is the brand new skilltree!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSkilltree = res.body;
          done();
        });
    });

    it('should respond with the newly created skilltree', function() {
      expect(newSkilltree.name).to.equal('New Skilltree');
      expect(newSkilltree.info).to.equal('This is the brand new skilltree!!!');
    });

  });

  describe('GET /api/skilltree/:id', function() {
    var skilltree;

    beforeEach(function(done) {
      request(app)
        .get('/api/skilltree/' + newSkilltree._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          skilltree = res.body;
          done();
        });
    });

    afterEach(function() {
      skilltree = {};
    });

    it('should respond with the requested skilltree', function() {
      expect(skilltree.name).to.equal('New Skilltree');
      expect(skilltree.info).to.equal('This is the brand new skilltree!!!');
    });

  });

  describe('PUT /api/skilltree/:id', function() {
    var updatedSkilltree

    beforeEach(function(done) {
      request(app)
        .put('/api/skilltree/' + newSkilltree._id)
        .send({
          name: 'Updated Skilltree',
          info: 'This is the updated skilltree!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSkilltree = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSkilltree = {};
    });

    it('should respond with the updated skilltree', function() {
      expect(updatedSkilltree.name).to.equal('Updated Skilltree');
      expect(updatedSkilltree.info).to.equal('This is the updated skilltree!!!');
    });

  });

  describe('DELETE /api/skilltree/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/skilltree/' + newSkilltree._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when skilltree does not exist', function(done) {
      request(app)
        .delete('/api/skilltree/' + newSkilltree._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });*/

});
