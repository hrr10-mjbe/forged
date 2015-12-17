'use strict';

angular.module('hrr10MjbeApp')
  .service('Teacher', function($http, Auth) {

    //this object will always be a fully sane resource
    //All the asynchronous messiness involved is taken care of
    //in this service, and it can be used synchronously
    var data;

    var update = function() {
      Auth.getCurrentUser().then(function(user) {
         data = user.teacherData;
      })
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
