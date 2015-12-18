'use strict';

angular.module('hrr10MjbeApp')
  .service('Student', function($http, Auth, Skills, Badges) {
    var user;

    //TODO indexOf _id helper method

    var getUser = function(cb) {
      if (user) return cb(user);
      Auth.getCurrentUser(null).then(function(res) {
        user = res;
        cb(user);
      });
    }

    var save = function() {
      getUser(function(student) {
        student.$update({}, function(res) {
          console.log('Saved and got: ');
          console.log(res.studentData);
          user.studentData = res.studentData;
        }, function(err) {
          console.log(err);
        })
      })
    }

    this.acceptRequest = function(req, cb) {
      $http({
        method: 'POST',
        url: '/api/users/accept',
        data: {
          _id: req
        }
      }).then(function successCallback(response) {
        cb(response.status);
      }, function errorCallback(response) {
        cb(response.status);
      });
    }

    this.getSkills = function(cb) {
      getUser(function(user) {
        cb(user.studentData.skills);
      })
    }

    this.addOrUpdateSkill = function(skillId, status) {
      getUser(function(user) {
        Skills.getSkill(skillId, function(skill) {
          for (var i = 0; i < user.studentData.skills.length; i++) {
            if (user.studentData.skills[i].skill._id === skillId) {
              user.studentData.skills[i].status = status;
              return save();
            }
          }
          user.studentData.skills.push({
            skill: skill,
            status: status
          });
          save();
        })
      })
    }

    this.awardBadges = function(cb) {
      getUser(function(user) {
        console.log(user);
        Badges.awardBadges(user.studentData, function(newBadges) {
          [].push.apply(user.studentData.badges, newBadges);
          save();
          if (cb) cb(newBadges);
        })
      })
    }

    this.hasBadge = function(badgeId, cb) {
      getUser(function(user) {
        for (var i = 0; i < user.studentData.badges.length; i++) {
          if (user.studentData.badges[i]._id === badgeId) {
            cb(true);
          }
        }
        cb(false);
      });
    }
  });
