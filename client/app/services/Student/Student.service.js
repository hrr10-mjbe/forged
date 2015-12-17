'use strict';

angular.module('hrr10MjbeApp')
  .service('Student', function ($http, Auth) {
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
  });
