'use strict';

angular.module('hrr10MjbeApp')
  .controller('DashboardCtrl', function ($scope, Teacher) {
    $scope.message = 'Hello';
    $scope.submit = function() {
      console.log($scope.add);
      Teacher.sendInvite($scope.add, function(result) {
        console.log(result);
      })
    }
  });
