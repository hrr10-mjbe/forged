'use strict';

angular.module('hrr10MjbeApp')
  .controller('DashboardCtrl', function($scope, $state, Teacher) {
    $scope.message = 'Hello';
    $scope.selectedClass = "";
    $scope.classname = "";
    $scope.addCount = '0';
    $scope.inviteCount = '0';
    var addCount = 0;
    var inviteCount = 0;
    Teacher.getClasses(function(classes) {
      $scope.listedClasses = classes;
      $scope.classes = JSON.stringify(classes);
    });

    Teacher.getRequests(function(requests) {
      $scope.invitations = requests;
    })

    $scope.submit = function() {
      console.log('submitting');
      console.log($scope.email);
      console.log($scope.activeClass);
      Teacher.sendInvite($scope.email, $scope.activeClass, function(result) {
        if (result === 200) {
          Teacher.getRequests(function(requests) {
            $scope.invitations = requests;
          })
        } else {
          $scope.invitations = [{
            student: 'error'
          }];
        }
      })
    }

    $scope.submitClass = function() {
      Teacher.addClass($scope.classname, function(res) {
        if (res === -1) {
          return alert('duplicate class');
        }
        console.log('returning');
        Teacher.getClasses(function(classes) {
          $scope.listedClasses = classes;
          $scope.classes = JSON.stringify(classes.map(function(val) {
            return {
              id: val._id,
              name: val.name
            };
          }));
          console.log($scope.listedClasses);
        });
      });
    }

    $scope.polymerChange = function() {
      if (Number.parseInt($scope.addCount) > addCount) {
        $scope.submitClass();
        addCount++;
      }

      if (Number.parseInt($scope.inviteCount) > inviteCount) {
        //$scope.submitClass();
        console.log('inviting');
        console.log($scope.email);
        $scope.submit();
        inviteCount++;
      }
    }
  });
