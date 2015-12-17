'use strict';

angular.module('hrr10MjbeApp')
  .service('Teacher', function($http) {
    this.sendInvite = function(email, cb) {
      $http({
        method: 'POST',
        url: '/api/users/invite',
        data: {email: email}
      }).then(function successCallback(response) {
        cb(response.status);
      }, function errorCallback(response) {
        cb(response.status);
      });
    }
  });
