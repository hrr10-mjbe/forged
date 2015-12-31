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
        } else {
          if (defaultUser) return cb(null);
          $http({
            method: 'GET',
            url: '/api/defaultuser'
          }).then(function(res) {
            defaultUser = res.data;
            console.log(defaultUser);
            cb(null);
          })
        }
      })
    }

    var save = function(cb) {
      getUser(function(student) {
        student.$update({}, function(res) {
          console.log('Saved and got: ');
          console.log(res.studentData);
          user.studentData = res.studentData;
          Util.safeCb(cb)();
        }, function(err) {
          Util.safeCb(cb)();
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

    this.getName = function(cb) {
      getUser(function(user) {
        cb(user === null ? 'Guest' : user.name);
      })
    }

    this.getSkills = function(cb) {
      getUser(function(user) {
        console.log('skills');
        console.log(user);
        cb(user === null ? [] : user.studentData.skills);
      })
    }

    this.addOrUpdateSkill = function(skillId, status, cb) {
      this.addPointsForSkill(skillId, function() {
        getUser(function(user) {
          if (!user) return;
          Skills.getSkill(skillId, function(skill) {
            console.log('found skill');
            for (var i = 0; i < user.studentData.skills.length; i++) {
              if (user.studentData.skills[i].skill._id === skillId) {
                console.log('has skill');
                user.studentData.skills[i].status = status;
                return save(cb);
              }
            }
            console.log('pushing skill');
            user.studentData.skills.push({
              skill: skill,
              status: status
            });
            save(cb);
          })
        })
      })
    }

    this.getSkillRoot = function(cb) {
      getUser(function(user) {
        //what to do here
        console.log('getting skill root');
        console.log(user.studentData.skillRoot);
        cb(user.studentData.skillRoot);
      })
    }

    this.awardBadges = function(cb) {
      getUser(function(user) {
        if (!user) return cb([]);
        Badges.awardBadges(user.studentData, function(newBadges) {
          [].push.apply(user.studentData.badges, newBadges);
          save();
          if (cb) cb(newBadges);
        })
      })
    }

    this.hasBadge = function(badgeId, cb) {
      getUser(function(user) {
        if (!user) return cb(false);
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
        if (!user) return;
        user.studentData.points += num;
        save();
      })
    }

    this.addPointsForSkill = function(skillId, cb) {
      getUser(function(user) {
        for (var i = 0; i < user.studentData.skills.length; i++) {
          if (skillId === user.studentData.skills[i].skill._id) {
            user.studentData.points += 50;
            return save(cb);
          }
        }
        user.studentData.points += 100;
        save(cb);
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
        if (!user) return;
        user.studentData.modifications[mod] = val;
        save();
      })
    }

    this.getLeaderboard = function(cb) {
      getUser(function(user) {
        if (!user) return cb(null);
        $http({
          method: 'GET',
          url: '/api/users/leaderboard'
        }).then(function(res) {
          cb(res.data);
        })
      })
    }

    this.getTime = function(cb) {
      getUser(function(user) {
        if (!user) return cb(0);
        var time = Date.now();
        cb(user.studentData.times[time - time % (24 * 60 * 60 * 1000)] || 0);
      })
    }

    this.getTimes = function(cb) {
      getUser(function(user) {
        if (!user) return cb([]);
        cb(user.studentData.times);
      })
    }

    this.updateTime = function(time) {
      getUser(function(user) {
        if (!user) return;
        var now = Date.now();
        user.studentData.times[now - now % (24 * 60 * 60 * 1000)] = time;
        if (time % 10 === 0) save();
      })
    }

    this.getJoined = function(cb) {
      getUser(function(user) {
        cb(user.joined);
      })
    }

    this.clear = function() {
      user = null;
    }
  });
