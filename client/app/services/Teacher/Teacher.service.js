'use strict';

angular.module('hrr10MjbeApp')
  .service('Teacher', function($http) {
    this.sendInvite = function(email, cb) {
      $http({
        method: 'POST',
        url: '/api/users/invite',
        data: email
      }).then(function successCallback(response) {
        console.log(response.data);
        cb(response.data);
      }, function errorCallback(response) {
        console.log(response);
      });
    }
  });
