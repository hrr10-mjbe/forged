'use strict';

angular.module('hrr10MjbeApp')
  .service('Student', function($http, Auth, Skills, Badges, Util) {
    var user;
    var defaultUser;

    //TODO indexOf _id helper method

    var getUser = function(cb) {
      if (user) return cb(user);
      Auth.isLoggedIn(function(is) {
        if (is) {
          Auth.getCurrentUser(function(res) {           
              user = res;
              cb(user);
            })
          }
        else {
          $http({
            method: 'GET',
            url: '/api/user/default'
          }).then(function(res) {
            defaultUser = res.data;
          })
          cb(null);
        }
      })
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
      console.log('accepting');
      console.log(req);
      $http({
        method: 'POST',
        url: '/api/users/accept',
        data: {
          request: req
        }
      }).then(function successCallback(response) {
        getUser(function(user) {
          user.studentData = response.data.studentData;
        })
          cb(response.status);
      }, function errorCallback(response) {
        cb(response.status);
      });
    }

    this.getSkills = function(cb) {
      getUser(function(user) {
        console.log('skills');
        console.log(user);
        cb(user === null ? [] : user.studentData.skills);
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

    this.getPoints = function(cb) {
      getUser(function(user) {
        cb(user === null ? 0 : user.studentData.points);
      })
    }

    this.addPoints = function(num) {
      getUser(function(user) {
        user.studentData.points += num;
        save();
      })
    }

    this.getBadges = function(cb) {
      getUser(function(user) {
        console.log(user);
        cb(user === null ? [] : user.studentData.badges);
      })
    }

    this.getRequests = function(cb) {
      getUser(function(user) {
        cb(user === null ? [] : user.studentData.requests);
      })
    }

    this.getTeacher = function(cb) {
      getUser(function(user) {
        cb(user === null ? {} : user.studentData.teacher);
      })
    }

    this.getModifications = function(cb) {
      getUser(function(user) {
        cb(user === null ? defaultUser.studentData.modifications : user.studentData.modifications);
      });
    }

    this.setModification = function(mod, val) {
      getUser(function(user) {
        user.studentData.modifications[mod] = val;
        save();
      })
    }
  });
