'use strict';

import app from '../..';
import User from './user.model';
import Badge from '../badge/badge.model';
import request from 'supertest';

//TODO: should PUT requests return the new object, like api/thing?

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
        badges[0].saveAsync();
      }).then(function() {
        badges[1].saveAsync();
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

    it('should add and normalize badges', function(done) {
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
              expect(user.studentData.badges[0].toString()).to.equal(badges[0]._id.toString());
              expect(user.studentData.badges[1].toString()).to.equal(badges[1]._id.toString());
              expect(user.studentData.badges[0]).to.not.have.property('name');
              expect(user.studentData.badges[1]).to.not.have.property('name');
              done();
            });
        });
    });

    it('should correctly denormalize badges', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .end(function(err, res) {
          expect(res.body.studentData.badges[0].name).to.equal(badges[0].name);
          expect(res.body.studentData.badges[1].name).to.equal(badges[1].name);
          done();
        });
    });
  });
});

describe('Class API:', function() {
  var user, token, userClient;

  // Clear users before testing
  before(function() {
    return User.removeAsync().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        type: 'teacher',
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

    it('should add classes', function(done) {
      userClient.teacherData.classes.push({
        name: 'test 1',
        students: []
      });
      userClient.teacherData.classes.push({
        name: 'test 2',
        students: []
      });
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
              expect(user.teacherData.classes[0].name).to.equal(userClient.teacherData.classes[0].name);
              expect(user.teacherData.classes[1].name).to.equal(userClient.teacherData.classes[1].name);
              done();
            });
        });
    });

    /*it('should correctly denormalize badges', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .end(function(err, res) {
          expect(res.body.studentData.badges[0].name).to.equal(badges[0].name);
          expect(res.body.studentData.badges[1].name).to.equal(badges[1].name);
          done();
        });
    });*/
  });
});

describe('Invitation API:', function() {
  var student, studentToken, teacher, teacherToken;

  // Clear users before testing
  before(function(done) {
    User.removeAsync().then(function() {
      student = new User({
        name: 'Student',
        email: 'student@example.com',
        type: 'student',
        password: 'password'
      });
      student.saveAsync().then(function() {
        teacher = new User({
          name: 'Teacher',
          email: 'teacher@example.com',
          type: 'teacher',
          password: 'password'
        });
        teacher.saveAsync().then(function() {
          done()
        })
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
        teacherToken = res.body.token;
        done();
      });
  });

  it('should log in the teacher', function(done) {
    request(app)
      .post('/auth/local')
      .send({
        email: 'teacher@example.com',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        teacherToken = res.body.token;
        done();
      });    
  });

  it('should send invitations', function(done) {
    request(app)
      .post('/api/users/invite')
      .set('authorization', 'Bearer ' + teacherToken)
      .send({email: student.email})
      .expect(200)
      .end(function(err, res) {
        User.findOneAsync({
            email: student.email
          })
          .then(function(user) {
            expect(user.studentData.requests[0].toString()).to.equal(teacher._id.toString());
            done();
          });
      });
  });

  it('should correctly denormalize badges', function(done) {
    request(app)
      .get('/api/users/me')
      .set('authorization', 'Bearer ' + token)
      .expect(200)
      .end(function(err, res) {
        expect(res.body.studentData.badges[0].name).to.equal(badges[0].name);
        expect(res.body.studentData.badges[1].name).to.equal(badges[1].name);
        done();
      });
  });
});
});
