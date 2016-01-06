'use strict';

angular.module('hrr10MjbeApp')
  .controller('ProfileCtrl', function($scope, $state, Student, Skills) {
    $scope.message = 'Hello';
    $scope.accepted = 'false';

    Skills.getSkills(function(skills) {
      $scope.skills = skills;
      $scope.skillsData = JSON.stringify(skills);
    });

    Student.getSkills(function(skills) {
      $scope.studentSkills = skills;
      $scope.studentSkillsData = JSON.stringify(skills);
    });

    Student.getRequests(function(requests) {
      $scope.request = requests[0];
    });

    Student.getTeacher(function(teacher) {
      $scope.teacher = teacher;
    })

    Student.getJoined(function(joined) {
      $scope.joined = new Date(joined).toDateString();
    })

    Student.getName(function(name) {
      $scope.name = name;
    })

    Student.getPoints(function(points) {
      $scope.points = points;
    })

    Student.getBadges(function(badges) {
      $scope.badge = badges && badges.length ? JSON.stringify(badges[badges.length - 1]) : 'null';
    })

    Student.getTimes(function(times) {
      $scope.times = JSON.stringify(times);
    })

    $scope.go = function() {
      $state.go('s', {
        id: $scope.userselection
      });
    }

    $scope.polymerChange = function() {
      if ($scope.userselection) {
        $scope.go();
      }
      if ($scope.accepted === 'true') {
        Student.acceptRequest(JSON.parse($scope.request), function(res) {
          $scope.request = null;
        });
      }
    }
  });
