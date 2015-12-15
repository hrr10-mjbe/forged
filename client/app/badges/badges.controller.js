'use strict';

angular.module('hrr10MjbeApp')
  .controller('BadgesCtrl', function ($scope, Badges) {
    $scope.message = 'Hello';
    $scope.badges = JSON.stringify([{name:'addition',
                      image:'add'}]);
  });
