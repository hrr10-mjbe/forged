'use strict';

angular.module('hrr10MjbeApp')
  .service('Student', function (Auth) {
    this.acceptRequest = function(req) {
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
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
