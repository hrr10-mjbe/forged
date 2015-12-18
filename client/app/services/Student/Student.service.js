'use strict';

angular.module('hrr10MjbeApp')
  .service('Student', function($http, Auth, Skills) {
    var user;

    var getUser = function(cb) {
      if (user) return cb(user);
      Auth.getCurrentUser(null).then(function(res) {
        console.log('set');
        console.log(res);
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
          user.teacherData = res.teacherData;
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
        console.log('getting');
        cb(user.studentData.skills);
      })
    }

    this.addSkill = function(skillId, status) {
      getUser(function(user) {
        Skills.getSkill(skillId, function(skill) {
          user.studentData.skills.push({
            skill: skill,
            status: status
          });
          save();
        })
      })
    }
  });
