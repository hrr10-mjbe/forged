'use strict';
import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import DefaultUser from '../defaultuser/defaultuser.controller';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.findAsync({}, '-salt -hashedPassword')
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(handleError(res));
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  DefaultUser.makeUser(req.body, function(newUser) {
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.saveAsync()
      .spread(function(user) {
        var token = jwt.sign({
          _id: user._id
        }, config.secrets.session, {
          expiresInMinutes: 60 * 5
        });
        res.json({
          token: token
        });
      })
      .catch(validationError(res));
  });
};


/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
};

/**
 * Change a user's password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(function(user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(function() {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
};

/*
 * Updates the logged-in user's student and teacher data
 */
exports.update = function(req, res, next) {
  User.findByIdAsync(req.user._id)
    .then(function(user) {
      user.studentData = req.body.studentData;
      user.teacherData = req.body.teacherData;
      return user.saveAsync()
        .then(function() {
          exports.me(req, res, next);
        })
        .catch(validationError(res));
    });
};

/**
 * Get info for the logged-in user, populating relational data
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findById(userId, '-salt -hashedPassword')
    .populate('studentData.badges')
    .populate({
      path: 'teacherData.classes',
      populate: {
        path: 'students',
        select: '-salt -hashedPassword -studentData.requests'
      }
    })
    .populate({
      path: 'studentData.skills',
      populate: {
        path: 'skill'
      }
    })
    .populate('studentData.teacher', 'name email')
    .exec(function(err, user) {
      if (err) {
        return res.status(404).end();
      }
      res.json(user);
    });
};

/**
 * handles sending a student invitation to another user
 */
exports.invite = function(req, res, next) {
  //first, look up the student we're inviting
  User.findOneAsync({
      email: req.body.email.toLowerCase()
    })
    .then(function(user) {
      if (!user) {
        return res.status(404).end();
      }

      //save the request in their requests array
      user.studentData.requests.push({
        teacher: {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email
        },
        student: {
          _id: user._id,
          name: user.name,
          email: user.email
        },
        class: {
          _id: req.body.theClass
        }
      });
      user.saveAsync()
        .then(function() {

          //next, find and update the teacher's pending students array
          User.findByIdAsync(req.user._id).then(function(me) {
            if (!me) {
              return res.status(404).end();
            }
            me.teacherData.pendingStudents.push({
              teacher: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email
              },
              student: {
                _id: user._id,
                name: user.name,
                email: user.email
              },
              class: {
                _id: req.body.theClass
              }
            });
            me.saveAsync().then(function() {
              exports.me(req, res, next);
            })
          })
        })
    })
}

/**
 * handles accepting an invitation from a teacher
 */
exports.accept = function(req, res, next) {
  //look up the teacher in the database
  console.log(req.body.request);
  User.findByIdAsync(req.body.request.teacher._id)
    .then(function(teacher) {
      if (!teacher) {
        return res.status(404).end();
      }

      //add student to teacher's class
      console.log(teacher.teacherData.classes);
      if (!teacher.teacherData.classes.id(req.body.request.class._id)) {
        return res.status(404).end();
      }
      teacher.teacherData.classes.id(req.body.request.class._id).students.push(req.user._id);

      //remove from pending students
      teacher.teacherData.pendingStudents.pull(req.request);
      teacher.saveAsync()
        .then(function() {

          //find and update student with his new class information
          User.findByIdAsync(req.user._id).then(function(student) {
            if (!student) {
              return res.status(404).end();
            }
            student.studentData.teacher = req.body.request.teacher._id;
            student.studentData.myClass = {
              _id: req.body.request.class._id, name: req.body.request.class.name
            };

            //and remove from requests
            student.studentData.requests.pull(req.body.request._id);
            student.saveAsync()
              .then(function() {
                exports.me(req, res, next);
              })
          })
        })
    })
}

/**
 * generates and returns a points leaderboard for the logged-in student's class
 */
exports.leaderboard = function(req, res, next) {
  if (!req.user.studentData.teacher) {
    return res.status(400).end();
  }

  //first we find the student's teacher
  User.findById(req.user.studentData.teacher)
    .populate({
      path: 'teacherData.classes',
      populate: {
        path: 'students'
      }
    })
    .exec(function(err, teacher) {
      if (err || !teacher) {
        res.status(404).end();
      }

      //look up the student's class
      var theClass = teacher.teacherData.classes.id(req.user.studentData.myClass._id);
      if (!theClass) {
        res.status(404).end();
      }

      //generate list of students and points
      var result = [];
      for (var i = 0; i < theClass.students.length; i++) {
        result.push({
          name: theClass.students[i].name,
          points: theClass.students[i].studentData.points
        });
      }

      //sort by points and return
      result.sort(function(a, b) {
        return b.points - a.points;
      })
      res.json(result);
    })
}

exports.updateClassMod = function(req, res, next) {
  console.log('in update');
  console.log(req.body);
  var updateCount = 0;
  for (var i = 0; i < req.body.theClass.students.length; i++) {
    User.findByIdAsync(req.body.theClass.students[i]._id).then(function(student) {
      console.log('saving mods');
      console.log(req.body.modifications);
      console.log('saving student with id');
      console.log(student._id);
      student.studentData.modifications = req.body.modifications;
      student.saveAsync().then(function() {
        updateCount++;
        if (updateCount === req.body.theClass.students.length) {
          exports.me(req, res, next);
        }
      });
    })
  }

}

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
