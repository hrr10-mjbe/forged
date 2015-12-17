'use strict';

angular.module('hrr10MjbeApp')
  .controller('ProfileCtrl', function ($scope, Auth) {
    $scope.message = 'Hello';

    Auth.getCurrentUser(function(user) {
      $scope.requests = user.studentData.requests;
      console.log(user);
    })

    $scope.accept = function() {
      console.log('accepting');
    }
  });
