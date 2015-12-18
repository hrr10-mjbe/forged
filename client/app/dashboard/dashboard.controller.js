'use strict';

angular.module('hrr10MjbeApp')
  .controller('DashboardCtrl', function ($scope, $state, Teacher) {
    $scope.message = 'Hello';
    $scope.selectedClass = "";

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

    $scope.polymerChange = function() {
      console.log('triggered with');
      console.log($scope.selectedClass);
      if ($scope.selectedClass) {
        $state.go('classprogress', {id: $scope.selectedClass});
      }      
    }
  });
