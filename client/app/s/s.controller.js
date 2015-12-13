'use strict';

angular.module('hrr10MjbeApp')
  .controller('SCtrl', function ($scope, Problems) {
    Problems.setCurrentProblemSet(5);
    $scope.message = 'Hello';
    $scope.type = Problems.currentProblemSet();
  });
