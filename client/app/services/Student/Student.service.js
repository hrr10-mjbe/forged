'use strict';

angular.module('hrr10MjbeApp')
  .service('Student', function ($http, Auth) {
    var user;    

    var getUser = function(cb) {
      if (user) return cb(user);
      Auth.getCurrentUser(null).then(function(res) {
        console.log('set');
        user = res;
        cb(user);
      });
    }

    this.acceptRequest = function(req, cb) {
      console.log(req);
      $http({
        method: 'POST',
        url: '/api/users/accept',
        data: {_id: req}
      }).then(function successCallback(response) {
        cb(response.status);
      }, function errorCallback(response) {
        cb(response.status);
      });
    }

    this.getSkills = function(cb) {
      getUser(function(user) {
        console.log('getting');
        cb(user.studentData.skills);
      })
    }
  });
