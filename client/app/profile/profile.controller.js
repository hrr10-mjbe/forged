'use strict';

angular.module('hrr10MjbeApp')
  .controller('ProfileCtrl', function ($scope, Student) {
    $scope.message = 'Hello';

    Student.getRequests(function(requests) {
      $scope.requests = requests;
    });

    Student.getTeacher(function(teacher) {
      $scope.teacher = teacher;
    })

    $scope.accept = function() {
      console.log('accepting');
      Student.acceptRequest($scope.requests[0], function(res) {
        console.log(res);
      });
    }
  });
