'use strict';

import app from '../..';
import User from './user.model';
import Badge from '../badge/badge.model';
import request from 'supertest';

var mongoose = require('mongoose');
var Schema = mongoose.Schema
  
var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

var aaron = new Person({ _id: 0, name: 'Aaron', age: 100, stories: [] });

var story3 = new Story({title: 'another story'});


  var story1 = new Story({
    title: "Once upon a timex.",
    _creator: aaron._id    // assign the _id from the person
  });
  
  story1.save(function (err) {
    if (err) return handleError(err);
    var story2 = new Story({title: 'a story'});
    story2.save(function(err) {
      console.log('idddddddddddddd');
      console.log(story1._id);
      aaron.stories.push(story1._id);
      aaron.stories.push(story2._id);
      console.log(aaron);
      //aaron.stories = [story1._id, story2._id];
      console.log(aaron.stories);
      aaron.save(function(err) {
        Person.findOne({name: 'Aaron'}).exec(function(err, person) {
  console.log('found %s', person);
  console.log(person.stories);
})
      })
    })
    // thats it!

});
console.log('hi');

Story
.findOne({ title: 'Once upon a timex.' })
.populate('_creator')
.exec(function (err, story) {
  if (err) return handleError(err);
  console.log('yo');
  console.log(story._id);
  console.log('The creator is %s', story.title);
  // prints "The creator is Aaron"
});



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
          console.log(res.body);
          //they might not come back in the same order
          //expect (res.body.studentData.badges[0].name === badges[0].name || res.body.studentData.badges[1].name === badges[0].name).to.be.true;
          //expect(res.data.badges[0].toString()).to.equal(badges[0]._id.toString());
          expect(res.body.studentData.badges[0].name).to.equal(badges[0].name);
          /*expect(user.studentData.badges[0].toString()).to.equal(badges[0]._id.toString());
          expect(user.studentData.badges[1].toString()).to.equal(badges[1]._id.toString());
          expect(user.studentData.badges[0]).to.not.have.property('name');
          expect(user.studentData.badges[1]).to.not.have.property('name');*/
          done();
        });
    });

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
