'use strict';

angular.module('hrr10MjbeApp')
  .service('Badges', function($http, Auth) {
    this.badges = undefined;

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

    this.getUserBadges = function(cb) {
      Auth.isLoggedIn(function(is) {
        if (is) {
          Auth.getCurrentUser(function(user) {
            console.log(user.studentData.badges);
            cb(user.studentData.badges);
          });
        } else {
          cb([]);
        }
      });
    }

    this.awardBadges = function() {
      var newBadges = [];
      for (var i = 0; i < this.badges.length; i++) {
        if (checkBadge(this.badges[i].badgeDefId, Auth.getCurrentUser().studentData)) {
          newBadges.push(this.badges[i]);
        }
      }
      return newBadges;
    }

    this.getBadges(function(badges) {
      this.badges = badges;
    }.bind(this));
  });
