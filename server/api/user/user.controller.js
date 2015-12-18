'use strict';
import User from './user.model';
import Badge from '../badge/badge.model';
import Mongoose from 'mongoose';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

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
  var newUser = new User(req.body);
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
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(function(user) {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(function(err) {
      return next(err);
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
 * Change a users password
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

//must be kept up to date with schema
var normalizeStudent = function(studentData) {
  studentData.badges = studentData.badges.map(function(badge) {
    return Mongoose.Types.ObjectId(badge._id);
  });
  return studentData;
}

var normalizeTeacher = function(teacherData) {
  for (var i = 0; i < teacherData.classes.length; i++) {
    teacherData.classes[i].students = teacherData.classes[i].students.map(function(student) {
    return student._id;
  });
 }

//data normalization in this and exports.me must be kept up to date
exports.update = function(req, res, next) {
  User.findByIdAsync(req.user._id)
    .then(function(user) {
      user.studentData = normalizeStudent(req.body.studentData);
      user.teacherData = normalizeTeacher(req.body.teacherData);
      return user.saveAsync()
        .then(function() {
          res.status(204).json(user);
        })
        .catch(validationError(res));
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  //TODO promises
  var userId = req.user._id;
  User.findById(userId, '-salt -hashedPassword', function(err, user) {
    if (err) {
      return next(err);
    }

    User.populate(user, {
      path: 'studentData.badges studentData.requests studentData.teachers teacherData.classes teacherData.pendingStudents'
    }, function(err, user) {
      if (err) {
        return next(err);
      }
      res.json(user);
    })
  });
};

exports.invite = function(req, res, next) {
  User.findOneAsync({
      email: req.body.email.toLowerCase()
    })
    .then(function(user) {
      if (!user) {
        return res.status(404).end();
      }
      user.studentData.requests.push(req.user._id);
      user.saveAsync()
        .then(function() {
          User.findByIdAsync(req.user._id).then(function(me) {
            me.teacherData.pendingStudents.push(user._id);
            me.saveAsync().then(function() {
              res.status(200).end();
            })
          })
        })
    })
}

exports.accept = function(req, res, next) {
  User.findOneAsync({
      _id: req.body._id
    })
    .then(function(teacher) {
      if (!teacher) {
        return res.status(404).end();
      }
      teacher.teacherData.students.push(req.user._id);
      teacher.teacherData.pendingStudents.pull(req.user._id);
      teacher.saveAsync()
        .then(function() {
          User.findByIdAsync(req.user._id).then(function(student) {
            student.studentData.teachers.push(req.body._id);
            student.studentData.requests.pull(req.body._id);
            student.saveAsync()
              .then(function() {
                res.status(200).end();
              })
          })
        })
    })
}

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
