'use strict';

angular.module('hrr10MjbeApp')
  .controller('DashboardCtrl', function($scope, $state, Teacher) {
    $scope.message = 'Hello';
    $scope.selectedClass = "";

    Teacher.getClasses(function(classes) {
      $scope.listedClasses = classes;
      $scope.classes = JSON.stringify(classes.map(function(val) {
        return {
          id: val._id,
          name: val.name
        };
      }));
    });

    Teacher.getRequests(function(requests) {
      $scope.invitations = requests;
    })

    $scope.submit = function() {
      console.log($scope.addSelected);
      Teacher.sendInvite($scope.add, $scope.addSelected, function(result) {
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
      Teacher.addClass($scope.addClass, function(res) {
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
      /*if ($scope.selectedClass) {
        $state.go('classprogress', {
          id: $scope.selectedClass
        });
      }*/
      console.log('change');
      console.log(className);
  });
