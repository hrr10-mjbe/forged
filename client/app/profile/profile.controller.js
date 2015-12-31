'use strict';

angular.module('hrr10MjbeApp')
  .controller('ProfileCtrl', function($scope, $state, Student, Skills) {
    $scope.message = 'Hello';
    $scope.accepted = 'false';

    Skills.getSkills(function(skills) {
      $scope.skills = skills;
      $scope.skillsData = JSON.stringify(skills);
      console.log(skills);
      //Student.addOrUpdateSkill(skills[0]._id, 4);
      //Student.awardBadges();
      //console.log(skills);
    });

    Student.getSkills(function(skills) {
      $scope.studentSkills = skills;
      $scope.studentSkillsData = JSON.stringify(skills);
      console.log(skills);
      //Student.addOrUpdateSkill(skills[0]._id, 4);
      //Student.awardBadges();
      //console.log(skills);
    });

    Student.getRequests(function(requests) {
      $scope.request = requests[0];
      console.log(requests);
    });

    Student.getTeacher(function(teacher) {
      console.log(teacher);
      $scope.teacher = teacher;
    })

    Student.getJoined(function(joined) {
      $scope.joined = new Date(joined).toDateString();
    })

    Student.getName(function(name) {
      $scope.name = name;
    })

    $scope.go = function(){
      $state.go('s', {
        id: $scope.userselection
      });
    }

    Student.getPoints(function(points) {
      $scope.points = points;
    })

    Student.getBadges(function(badges) {
      $scope.badge = badges && badges.length ? JSON.stringify(badges[badges.length - 1]) : 'null';
    })

    Student.getTimes(function(times) {
      console.log('times');
      console.log(times);
      $scope.times = JSON.stringify(times);
    })

    $scope.polymerChange = function() {
      if ($scope.userselection) {
        $scope.go();
      }
      if ($scope.accepted === 'true') {
        console.log('accepting');
        Student.acceptRequest(JSON.parse($scope.request), function(res) {
          console.log(res);
        });
      }
    }
  });
