'use strict';

//TODO refactor to save current class/problem set on refresh

angular.module('hrr10MjbeApp')
  .service('Teacher', function($http, Auth) {

    var user, activeClass;
    
    var getUser = function(cb) {
      if (user) return cb(user);
      Auth.getCurrentUser(null).then(function(res) {
        user = res;
        cb(user);
      });
    }

    var save = function() {
      getUser(function(teacher) {
        teacher.$update({}, function(res) {
          console.log('Saved and got: ');
          console.log(res.studentData);
          user.teacherData = res.teacherData;
        }, function(err) {
          console.log(err);
        })
      })
    }

    this.addClass = function(name) {
      getUser(function(teacher) {
        teacher.classes.push({name: name, students: []});
        save();
      })
    }

    this.removeClass = function(id) {
      getUser(function(teacher) {
        for (var i = 0; i < teacher.classes.length; i++) {
          if (teacher.classes[i]._id === classId) {
            teacher.classes.splice(i, 1);
            return save();
          }
        }
      })
    }

    this.getClass = function(classId, cb) {
      getUser(function(teacher) {
        for (var i = 0; i < teacher.classes.length; i++) {
          if (teacher.classes[i]._id === classId) {
            return cb(teacher.classes[i]);
          }
        }
        cb(null);
      })
    }

    this.getClasses = function(cb) {
      getUser(function(teacher) {
        console.log(teacher.teacherData);
        cb(teacher.teacherData.classes);
      })
    }

    this.getStudent = function(classId, studentId, cb) {
      this.getClass(classId, function(theClass) {
        for (var i = 0; i < theClass.students.length; i++) {
          if (theClass.students[i]._id === studentId) {
            return cb(theClass.students[i]);
          }
        }
        cb(null);
      })
    }

    this.sendInvite = function(email, classId, cb) {
      $http({
        method: 'POST',
        url: '/api/users/invite',
        data: {
          email: email,
          class: classId
        }
      }).then(function successCallback(response) {
        cb(response.status);
      }, function errorCallback(response) {
        cb(response.status);
      });
    }
  });
