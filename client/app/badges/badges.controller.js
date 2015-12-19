'use strict';

angular.module('hrr10MjbeApp')
  .controller('BadgesCtrl', function($scope, Student) {
    $scope.message = 'Hello';
    Student.getBadges(function(badges) {
      $scope.badges = badges;
    });
  });
