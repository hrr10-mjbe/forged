'use strict';

angular.module('hrr10MjbeApp')
  .controller('ProfileCtrl', function ($scope, Auth, Student) {
    $scope.message = 'Hello';

    Auth.getCurrentUser(function(user) {
      $scope.requests = user.studentData.requests;
      $scope.teachers = user.studentData.teachers;
      console.log(user);
    })

    $scope.accept = function() {
      console.log('accepting');
      Student.acceptRequest($scope.requests[0], function(res) {
        console.log(res);
      });
    }
  });
