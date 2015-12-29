'use strict';

angular.module('hrr10MjbeApp')
  .controller('ProfileCtrl', function($scope, Student) {
    $scope.message = 'Hello';
    $scope.accepted = 'false';

    Student.getRequests(function(requests) {
      $scope.request = requests[0];
      $scope.request = {
        teacher: {
          name: 'a teacher'
        },
        class: {
          name: 'Math'
        }
      };
      console.log(requests);
    });

    Student.getTeacher(function(teacher) {
      console.log(teacher);
      $scope.teacher = teacher;
    })

    $scope.accept = function() {
      

    }

    $scope.polymerChange = function() {
      if ($scope.accepted === 'true') {
        console.log('accepting');
        Student.acceptRequest($scope.request, function(res) {
          console.log(res);
        });
      }
    }
  });
