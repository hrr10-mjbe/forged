'use strict';

angular.module('hrr10MjbeApp')
  .controller('ProfileCtrl', function ($scope, Student) {
    $scope.message = 'Hello';
    $scope.accepted = 'false';

    Student.getRequests(function(requests) {
      $scope.request = requests[0];
      $scope.request = {test: 'hi'};
      console.log(requests);
    });

    Student.getTeacher(function(teacher) {
      console.log(teacher);
      $scope.teacher = teacher;
    })

    $scope.accept = function() {
      console.log('accepting');
      Student.acceptRequest($scope.requests[0], function(res) {
        console.log(res);
      });
    }
  });
