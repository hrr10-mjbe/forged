'use strict';

import app from '../..';
import User from './user.model';
import Badge from '../badge/badge.model';
import request from 'supertest';

describe('User API:', function() {
  var user;

  // Clear users before testing
  before(function() {
    return User.removeAsync().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        type: 'student',
        password: 'password'
      });

      return user.saveAsync();
    });
  });

  // Clear users after testing
  after(function() {
    return User.removeAsync();
  });

  describe('GET /api/users/me', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.body._id.toString()).to.equal(user._id.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });
  });


});

/*describe('Student info API', function() {
  var user;
  var badges = [];

  // Clear users before testing
  before(function() {
    Badge.removeAsync().then(function() {
        badges[0] = new Badge({
          name: 'Fake Badge 1'
        });
        badges[1] = new Badge({
          name: 'Fake Badge 2'
        });
      })
      .then(function() {
        User.removeAsync().then(function() {
          user = new User({
            name: 'Fake User',
            email: 'test@example.com',
            type: 'student',
            password: 'password'
          });
          return user.saveAsync();
        });
      });

    
  });
});

// Clear users after testing
after(function() {
  User.removeAsync();
  return Badge.removeAsync();
});*/

describe('Student info API:', function() {
  var user, token, userClient, badges = [];

  // Clear users before testing
  before(function(done) {
    Badge.removeAsync().then(function() {
        badges[0] = new Badge({
          name: 'Fake Badge 1'
        });
        badges[1] = new Badge({
          name: 'Fake Badge 2'
        });
      })
      .then(function() {
        User.removeAsync().then(function() {
          user = new User({
            name: 'Fake User',
            email: 'test@example.com',
            type: 'student',
            password: 'password'
          });
          user.saveAsync().then(function() {
            done()
          });
        });
      });
  });

  // Clear users after testing
  after(function() {
    return User.removeAsync();
  });

  describe('GET /api/users/me', function() {

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          userClient = res.body;
          expect(res.body._id.toString()).to.equal(user._id.toString());
          done();
        });
    });

    it('should add badges', function(done) {
      userClient.studentData.badges.push(badges[0]);
      userClient.studentData.badges.push(badges[1]);
      request(app)
        .put('/api/users/me/update')
        .set('authorization', 'Bearer ' + token)
        .send(userClient)
        .expect(200)
        .end(function(err, res) {
          User.findOneAsync({
              _id: user._id
            })
            .then(function(user) {
              console.log(user);
              expect(user.studentData.badges[0].toString()).to.equal(badges[0]._id.toString());
              done();
            });
        });

    });

    it('should normalize before storing badges', function(done) {
      User.findOneAsync({
          _id: user._id
        })
        .then(function(user) {
          expect(user.studentInfo.badges[0]).to.equal(undefined);
          done();
        });
    })

  });


});



/*describe('PUT /api/users/me/update', function() {
  var token;

   before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });

  it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.body._id.toString()).to.equal(user._id.toString());
          done();
        });
    });

  /*before(function(done) {
    request(app)
      .post('/auth/local')
      .send({
        email: 'test@example.com',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        token = res.body.token;
        request(app).get('/api/users/me')
          .set('authorization', 'Bearer ' + token)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            console.log(res);
            expect(res.body._id.toString()).to.equal(user._id.toString());
            done();
          });
      })

  });

  it('should add badges', function(done) {
    request(app)
      .get('/api/users/me')
      .set('authorization', 'Bearer ' + token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        expect(res.body._id.toString()).to.equal(user._id.toString());
        done();
      });*/
/*request(app)
  .put('/api/users/me/update')
  .set('authorization', 'Bearer ' + token)
  .send({
    studentInfo:
  })
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function(err, res) {
    expect(res.body._id.toString()).to.equal(user._id.toString());
    done();
  });*/

/* describe('PUT /api/things/:id', function() {
  var updatedThing

  beforeEach(function(done) {
    request(app)
      .put('/api/things/' + newThing._id)
      .send({
        name: 'Updated Thing',
        info: 'This is the updated thing!!!'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        updatedThing = res.body;
        done();
      });
  });

  afterEach(function() {
    updatedThing = {};
  });

  it('should respond with the updated thing', function() {
    expect(updatedThing.name).to.equal('Updated Thing');
    expect(updatedThing.info).to.equal('This is the updated thing!!!');
  });

});*/

/* it('should respond with a 401 when not authenticated', function(done) {
    request(app)
      .get('/api/users/me')
      .expect(401)
      .end(done);
  });
});*/
