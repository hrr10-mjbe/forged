'use strict';

angular.module('hrr10MjbeApp')
  .controller('DashboardCtrl', function ($scope, Teacher, Auth) {
    $scope.message = 'Hello';

    Auth.getCurrentUser(function(user) {
      $scope.invitations = user.teacherData.pendingStudents;
      console.log(user);
    })
    $scope.submit = function() {
      console.log($scope.add);
      Teacher.sendInvite($scope.add, function(result) {
        console.log(result);
      })
    }
  });
