'use strict';

angular.module('hrr10MjbeApp')
  .service('Badges', function($http, Auth) {
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
      if (this.badges) {
        cb(this.badges);
      } else {
        $http({
          method: 'GET',
          url: '/api/badges'
        }).then(function(res) {
          this.badges = res.data;
          cb(this.badges);
        }.bind(this))
      }
    }

    this.awardBadges = function(studentData) {
      var newBadges = [];
      for (var i = 0; i < this.badges.length; i++) {
        if (checkBadge(this.badges[i].badgeDefId, studentData)) {
          newBadges.push(this.badges[i]);
        }
      }
      return newBadges;
    }

    this.getBadges(function(badges) {
      this.badges = badges;
    }.bind(this));
  });
