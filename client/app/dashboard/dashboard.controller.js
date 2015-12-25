'use strict';

angular.module('hrr10MjbeApp')
  .controller('DashboardCtrl', function($scope, $state, $rootScope, Teacher) {
    $scope.selectedClass = "";

    $scope.classname = "";
    $scope.addCount = '0';
    $scope.inviteCount = '0';
    var addCount = 0;
    var inviteCount = 0;
    var first = true;

    //reloads stuff
    $scope.refresh = function() {
      Teacher.getClasses(function(classes) {
        $scope.listedClasses = classes;
        Teacher.getRequests(function(requests) {
          //this is pretty hacky. the pending students are stored seperately on the server, but now we want to show
          //them as part of a particular class, so we scan through and populate them here
          for (var i = 0; i < requests.length; i++) {
            for (var j = 0; j < classes.length; j++) {
              if (requests[i].class._id === classes[j]._id) {
                classes[j].students.push({
                  name: requests[i].student.name,
                  email: requests[i].student.email,
                  status: 'pending'
                })
              }
            }
          }
          $scope.classes = JSON.stringify(classes);
          //select first class as default
          if (first) {
            $scope.activeClass = classes[0]._id.toString();
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
    }

    $scope.refresh();

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      console.log(toState);
      if (toState.url === '/dashboard') {
        console.log('refreshing');
        $scope.refresh();
      }
    })
  });
