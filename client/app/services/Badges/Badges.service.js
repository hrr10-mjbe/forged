'use strict';

angular.module('hrr10MjbeApp')
  .service('Badges', function($http, Student) {
    var badges;

    var getBadges = function(cb) {
      if (badges) return cb(badges);
      $http({
        method: 'GET',
        url: '/api/badges'
      }).then(function(res) {
        badges = res.data;
        cb(badges);
      });
    }

    this.getBadges = function(cb) {
      getBadges(function(badges) {
        cb(badges);
      });
    }

    this.awardBadges = function(studentData, cb) {
      var newBadges = [];
      getBadges(function(badges) {
        for (var i = 0; i < badges.length; i++) {
          if (checkBadge(badges[i].badgeDefId, studentData)) {
            Student.hasBadge(function(res) {
              if (!res) newBadges.push(badges[i]);
            });
          }
        }
        cb(newBadges);
      })
    }

  });
