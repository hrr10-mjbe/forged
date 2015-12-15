'use strict';

angular.module('hrr10MjbeApp')
  .controller('BadgesCtrl', function ($scope, Badges) {
    $scope.message = 'Hello';
    Badges.getUserBadges(function(badges) {
      $scope.badges = badges;
    });
    /*JSON.stringify([{name:'addition',
                      image:'add'}]);*/
  });
