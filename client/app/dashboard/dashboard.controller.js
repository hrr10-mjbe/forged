'use strict';

angular.module('hrr10MjbeApp')
  .controller('DashboardCtrl', function($scope, $state, Teacher) {
    $scope.selectedClass = "";

    $scope.classname = "";
    $scope.addCount = '0';
    $scope.inviteCount = '0';
    var addCount = 0;
    var inviteCount = 0;

    $scope.refresh = function() {
      Teacher.getClasses(function(classes) {
        $scope.listedClasses = classes;
        console.log('refreshed and got classes');
        console.log(classes);
        Teacher.getRequests(function(requests) {
          for (var i = 0; i < requests.length; i++) {
            for (var j = 0; j < classes.length; j++) {
              if (requests[i].class._id === classes[j]._id) {
                console.log('pushing');
                classes[j].students.push({
                  name: requests[i].student.name,
                  email: requests[i].student.email,
                  status: 'pending'
                })
              }
            }
          }
          $scope.classes = JSON.stringify(classes);
          $scope.activeClass = classes[0]._id.toString();
          console.log('activeClass is');
          console.log($scope.activeClass);
        })
      });
    }

    $scope.submit = function() {
      console.log('submitting');
      console.log($scope.email);
      console.log($scope.activeClass);
      Teacher.sendInvite($scope.email, $scope.activeClass, function(result) {
        if (result === 200) {
          $scope.refresh();
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
              _id: val._id,
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

    $scope.refresh();
  });
