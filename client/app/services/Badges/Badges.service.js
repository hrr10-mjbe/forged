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
            cb(user.badges);
          });
        } else {
          cb([]);
        }
      });
    }

    this.awardBadges = function() {
      var newBadges = [];
      for (var i = 0; i < this.badges.length; i++) {
        console.log(this.badges[i].badgeDefId);
        if (checkBadge(this.badges[i].badgeDefId, Auth.getCurrentUser().studentData)) {
          console.log('ifff');
          console.log(this.badges[i]);
          newBadges.push(this.badges[i]);
        }
      }
      console.log("new badges: ");
      console.log(newBadges);
      return newBadges;
    }

    this.getBadges(function(badges) {
      this.badges = badges;
    }.bind(this));
  });
