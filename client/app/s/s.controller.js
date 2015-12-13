'use strict';

angular.module('hrr10MjbeApp')
  .controller('SCtrl', function ($scope, Problems) {
    Problems.setCurrentProblemSet(2);
    $scope.message = 'Hello';
    $scope.type = Problems.currentProblemSet();
  });
