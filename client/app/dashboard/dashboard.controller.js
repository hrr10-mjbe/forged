'use strict';

angular.module('hrr10MjbeApp')
  .controller('DashboardCtrl', function($scope, $state, $rootScope, Teacher, Skills) {
    $scope.selectedClass = "";

    $scope.classname = "";
    $scope.addCount = '0';
    $scope.inviteCount = '0';
    var addCount = 0;
    var inviteCount = 0;
    var first = true;
    $scope.modSubmitCount = '0';
    var modSubmitCount = 0;
    var activeClass;
    var individualMod;

    Skills.getSkills(function(skills) {
      $scope.skills = skills;
      $scope.skillsData = JSON.stringify(skills);
    });

    //reloads stuff
    $scope.refresh = function() {
      Teacher.getClasses(function(classes) {
        $scope.listedClasses = JSON.parse(JSON.stringify(classes));
        Teacher.getRequests(function(requests) {
          //this is pretty hacky. the pending students are stored seperately on the server, but now we want to show
          //them as part of a particular class, so we scan through and populate them here
          for (var i = 0; i < requests.length; i++) {
            for (var j = 0; j < $scope.listedClasses.length; j++) {
              if (requests[i].class._id === classes[j]._id) {
                $scope.listedClasses[j].students.push({
                  name: requests[i].student.name,
                  email: requests[i].student.email,
                  status: 'pending'
                });
              }
            }
          }
          $scope.classes = JSON.stringify($scope.listedClasses);
          //select first class as default
          if (first) {
            $scope.activeClass = $scope.listedClasses[0]._id.toString();
            activeClass = $scope.activeClass;
            $scope.showTimer = $scope.listedClasses[i].modifications.showTimer ? 'true' : 'false';
            $scope.showLeaderboard = $scope.listedClasses[i].modifications.showLeaderboard ? 'true' : 'false';
            $scope.showWhiteboard = $scope.listedClasses[i].modifications.showWhiteboard ? 'true' : 'false';
            first = false;
          }
        })
      });
    }

    //submits invitation
    $scope.submit = function() {
      Teacher.sendInvite($scope.email, $scope.activeClass, function(result) {
        if (result === 200) {
          $scope.refresh();
        } else {
          //TODO this won't do anything anymore
          $scope.invitations = [{
            student: 'error'
          }];
        }
      })
    }

    //submits new class
    $scope.submitClass = function() {
      Teacher.addClass($scope.classname, function(res) {
        if (res === -1) {
          return alert('duplicate class');
        }
        Teacher.getClasses(function(classes) {
          $scope.listedClasses = classes;
          $scope.classes = JSON.stringify(classes.map(function(val) {
            return {
              _id: val._id,
              name: val.name
            };
          }));
        });
      });
    }

    $scope.polymerChange = function() {
      if (Number.parseInt($scope.addCount) > addCount) {
        $scope.submitClass();
        addCount++;
      }

      if (Number.parseInt($scope.inviteCount) > inviteCount) {
        $scope.submit();
        inviteCount++;
      }

      if (Number.parseInt($scope.modSubmitCount) > modSubmitCount) {
        Teacher.setModifications($scope.activeClass, {
          showTimer: $scope.showTimer === 'true' ? true : false,
          showWhiteboard: $scope.showWhiteboard === 'true' ? true : false,
          showLeaderboard: $scope.showLeaderboard === 'true' ? true : false
        }, function() {
          $scope.refresh();
        })
        modSubmitCount++;
      }

      //refresh when active class changes
      if (activeClass !== $scope.activeClass) {
        for (var i = 0; i < $scope.listedClasses.length; i++) {
          if ($scope.listedClasses[i]._id === $scope.activeClass) {
            $scope.showTimer = $scope.listedClasses[i].modifications.showTimer ? 'true' : 'false';
            $scope.showLeaderboard = $scope.listedClasses[i].modifications.showLeaderboard ? 'true' : 'false';
            $scope.showWhiteboard = $scope.listedClasses[i].modifications.showWhiteboard ? 'true' : 'false';
          }
        }
        activeClass = $scope.activeClass;
      }

      if (individualMod !== $scope.individualMod) {
        individualMod = $scope.individualMod;
        var theMod = JSON.parse(JSON.parse(individualMod));
        Teacher.setIndividualModifications($scope.activeClass, theMod.student, theMod, function() {
          $scope.refresh();
        });
      }
    }

    $scope.refresh();

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.url === '/dashboard') {
        $scope.refresh();
      }
    })
  });
