'use strict';

angular.module('hrr10MjbeApp')
  .controller('DashboardCtrl', function ($scope, Teacher, Auth) {
    $scope.message = 'Hello';
    $scope.selected = "";

    Teacher.getClasses(function(classes) {
      $scope.classes = JSON.stringify(classes.map(function(val) {
        return {id: val._id, name: val.name};
      }));
    })

    $scope.submit = function() {
      console.log($scope.add);
      Teacher.sendInvite($scope.add, function(result) {
        console.log(result);
      })
    }

    $scope.bindPolymer = function() {
      console.log('triggered with');
      console.log($scope.selected);
    }
  });
