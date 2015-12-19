'use strict';

import app from '../..';
import User from './user.model';
import Class from './class.model';
import Badge from '../badge/badge.model';
import Skill from '../skill/skill.model';
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

describe('Student info API: Badges', function() {
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
        badges[0].saveAsync().then(function() {
          badges[1].saveAsync().then(function() {
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
          })
        })
      })
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

describe('Student info API: Skills', function() {
  var user, token, userClient, skills = [];

  // Clear users before testing
  before(function(done) {
    Skill.removeAsync().then(function() {
        skills[0] = new Skill({
          name: 'Fake Skill 1'
        });
        skills[1] = new Skill({
          name: 'Fake Skill 2'
        });
      })
      .then(function() {
        skills[0].saveAsync().then(function() {
          skills[1].saveAsync().then(function() {
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
          })
        })
      })
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

    it('should add and normalize skills', function(done) {
      userClient.studentData.skills.push({skill: skills[0], status: 2});
      userClient.studentData.skills.push({skill: skills[1], status: 1});
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
              expect(user.studentData.skills[0].skill.toString()).to.equal(skills[0]._id.toString());
              expect(user.studentData.skills[1].skill.toString()).to.equal(skills[1]._id.toString());
              Skill.findByIdAsync(skills[1]._id)
                .then(function(skill) {
                  console.log('her');
                  console.log(user.studentData.skills);
                  expect(user.studentData.skills[0].skill).to.not.have.property('name');
                  expect(user.studentData.skills[1].skill).to.not.have.property('name');
                  done();
                });
            });
        });
    });

    it('should correctly denormalize skills', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .end(function(err, res) {
          console.log(res.body.studentData);
          expect(res.body.studentData.skills[0].skill.name).to.equal(skills[0].name);
          expect(res.body.studentData.skills[1].skill.name).to.equal(skills[1].name);
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
  var student, studentToken, teacher, teacherToken, className = 'a test class',
    newClass;

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
          password: 'password',
          teacherData: {
            classes: [newClass = new Class({
              name: className,
              students: []
            })]
          }
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

  it('should log in users', function(done) {
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
        request(app)
          .post('/auth/local')
          .send({
            email: 'student@example.com',
            password: 'password'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            studentToken = res.body.token;
            done();
          });

      });
  });

  it('should allow users to send invitations', function(done) {
    request(app)
      .post('/api/users/invite')
      .set('authorization', 'Bearer ' + teacherToken)
      .send({
        email: student.email,
        theClass: newClass._id
      })
      .expect(200)
      .end(function(err, res) {
        User.findOneAsync({
            email: student.email
          })
          .then(function(user) {
            console.log('newClass')
            console.log(newClass);
            console.log(user.studentData.requests);
            expect(user.studentData.requests[0].teacher.toString()).to.equal(teacher._id.toString());
            User.findByIdAsync(teacher._id).then(function(user) {
              console.log(user.teacherData.pendingStudents);
              expect(user.teacherData.pendingStudents[0].student.toString()).to.equal(student._id.toString());
              expect(user.teacherData.pendingStudents[0].class._id.toString()).to.equal(newClass._id.toString());
              done();
            })
          });
      });
  });

  it('should allow users to accept invitations', function(done) {
    var userClient;
    request(app)
      .get('/api/users/me')
      .set('authorization', 'Bearer ' + studentToken)
      .send()
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        userClient = res.body;
        request(app)
          .post('/api/users/accept')
          .set('authorization', 'Bearer ' + studentToken)
          .send({
            request: userClient.studentData.requests[0]
          })
          .expect(200)
          .end(function(err, res) {
            User.findByIdAsync(student._id).then(function(user) {
              expect(user.studentData.teacher.toString()).to.equal(teacher._id.toString());
              expect(user.studentData.requests.length).to.equal(0);
              User.findByIdAsync(teacher._id).then(function(user) {
                expect(user.teacherData.classes.id(newClass._id).students[0].toString()).to.equal(student._id.toString());
                expect(user.teacherData.pendingStudents.length).to.equal(0);
                done();
              })
            })
          });
      });

  });
});

//more tests:
//normalization/denormalization checking on adding student to classes
//individual skills and badges tests
