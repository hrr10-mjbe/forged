'use strict';

angular.module('hrr10MjbeApp')
  .controller('DashboardCtrl', function ($scope, Teacher) {
    $scope.message = 'Hello';
    $scope.click = function() {
      Teacher.sendInvite($scope.add, function(result) {
        console.log(result);
      })
    }
  });
