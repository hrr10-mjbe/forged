'use strict';

angular.module('hrr10MjbeApp')
  .service('Badges', function($http) {
    var badges;

    var hasBadge = function(studentData, badgeId) {
      for (var i = 0; i < studentData.badges.length; i++) {
        if (studentData.badges[i]._id === badgeId) {
          return true;
        }
      }
      return false;
    }

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
          if (checkBadge(badges[i].badgeDefId, studentData) && !hasBadge(studentData, badges[i]._id)) {
            newBadges.push(badges[i]);
          }
        }
        cb(newBadges);
      })
    }

  });
