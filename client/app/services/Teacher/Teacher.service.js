'use strict';

angular.module('hrr10MjbeApp')
  .service('Teacher', function($http, Auth, Util) {

    var user, activeClass;

    //var indexOfId(arr, )

    var hasClass = function(classes, name) {
      for (var i = 0; i < classes.length; i++) {
        if (classes[i].name === name) return true;
      }
      return false;
    }

    var getUser = function(cb) {
      if (user) return cb(user);
      Auth.getCurrentUser(null).then(function(res) {
        user = res;
        cb(user);
      });
    }

    var save = function(cb) {
      getUser(function(teacher) {
        teacher.$update({}, function(res) {
          console.log('Saved and got: ');
          console.log(res.teacherData);
          user.teacherData = res.teacherData;
          console.log(cb);
          Util.safeCb(cb)();
        }, function(err) {
          console.log(err);
          Util.safeCb(cb)();
        })
      })
    }

    this.addClass = function(name, cb) {
      getUser(function(teacher) {
        if (hasClass(teacher.teacherData.classes, name)) return cb(-1);
        teacher.teacherData.classes.push({
          name: name,
          students: []
        });
        save(cb);
      })
    }

    this.removeClass = function(id) {
      getUser(function(teacher) {
        for (var i = 0; i < teacher.teacherData.classes.length; i++) {
          if (teacher.teacherData.classes[i]._id === classId) {
            teacher.teacherData.classes.splice(i, 1);
            return save();
          }
        }
      })
    }

    this.getClass = function(classId, cb) {
      getUser(function(teacher) {
        for (var i = 0; i < teacher.teacherData.classes.length; i++) {
          if (teacher.teacherData.classes[i]._id === classId) {
            return cb(teacher.teacherData.classes[i]);
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
      console.log('sending classid');
      console.log(classId);
      $http({
        method: 'POST',
        url: '/api/users/invite',
        data: {
          email: email,
          theClass: classId
        }
      }).then(function successCallback(response) {
        getUser(function(user) {
          console.log('invite responded with');
          console.log(response.data.teacherData);
          user.teacherData = response.data.teacherData;
          cb(response.status);
        })
      }, function errorCallback(response) {
        cb(response.status);
      });
    }

    this.getRequests = function(cb) {
      getUser(function(user) {
        cb(user.teacherData.pendingStudents);
      })
    }
  });
