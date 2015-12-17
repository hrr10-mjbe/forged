'use strict';

angular.module('hrr10MjbeApp')
  .service('Teacher', function($http, Auth) {

    var user = Auth.getCurrentUser();
    var activeClassId;

    var update = function() {
      Auth.getCurrentUser().then(function(user) {
         data = user.teacherData;
      })
    } 

    this.setClass = function(id) {
      activeClassId = id;
    }

    this.getCLass = function() {
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

    this.refresh();
  });
