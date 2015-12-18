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

    this.setActiveClass = function(id) {
      for (var i = 0; i < user.teacherData.classes.length; i++) {
        if (user.teacherData.classes[i]._id === id) {
          return activeClass = user.teacherData.classes[i];
        }
      }
    }

    this.getActiveClass = function() {
      return activeClass;
    }

    this.addClass = function(name) {
      getUser(function(teacher) {
        teacher.classes.push({name: name, students: []});
        save();
      })
    }

    this.removeClass = function(id) {
      
    }

    this.getStudent = function(id) {

    }

    this.get

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

    this.refresh();
  });
