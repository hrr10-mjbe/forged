'use strict';

angular.module('hrr10MjbeApp')
  .controller('DashboardCtrl', function ($scope, $state, Teacher) {
    $scope.message = 'Hello';
    $scope.selectedClass = "";

    Teacher.getClasses(function(classes) {
      $scope.listedClasses = classes;
      console.log('classes:');
      console.log(classes);
      $scope.classes = JSON.stringify(classes.map(function(val) {
        return {id: val._id, name: val.name};
      }));
    });

    Teacher.getRequests(function(requests) {
      $scope.invitations = requests;
    })

    $scope.submit = function() {
      console.log($scope.addSelected);
      Teacher.sendInvite($scope.add, $scope.addSelected, function(result) {
        console.log(result);
      })
    }

    $scope.submitClass = function() {
      Teacher.addClass($scope.addClass);
    }

    $scope.polymerChange = function() {
      console.log('triggered with');
      console.log($scope.selectedClass);
      if ($scope.selectedClass) {
        $state.go('classprogress', {id: $scope.selectedClass});
      }      
    }
  });
