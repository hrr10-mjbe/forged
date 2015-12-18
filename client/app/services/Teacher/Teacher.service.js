'use strict';

angular.module('hrr10MjbeApp')
  .service('Teacher', function($http, Auth) {

    var user;
    Auth.getCurrentUser().then(function(res) {
      user = res;
    });
    
    var activeClassId;

    this.save = function() {
      User.update({}, user, function(res) {
        user.teacherData = res.teacherData;
      }, function(err) {
        console.log('Error updating user');
      });
    }

    this.setClass = function(id) {
      activeClassId = id;
    }

    this.getClass = function() {
      for (var i = 0; i < data.)
    }

    this.sendInvite = function(email, cb) {
      $http({
        method: 'POST',
        url: '/api/users/invite',
        data: {
          email: email
        }
      }).then(function successCallback(response) {
        cb(response.status);
      }, function errorCallback(response) {
        cb(response.status);
      });
    }

    this.getStudents = function() {
      return user.teacherData.students;
    }

    this.refresh();
  });
