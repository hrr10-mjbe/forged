'use strict';

angular.module('hrr10MjbeApp')
  .service('Skills', function($http, Problems) {
    var skills = undefined;
    var active = undefined;

    function changeSkill(newSkill) {
      active = newSkill;
      console.log(active);
      Problems.setCurrentProblemSet(newSkill.problemGenId);
    }

    this.getSkills = function(cb) {
      if (skills) {
        cb(skills);
      } else {
        $http({
          method: 'GET',
          url: '/api/skills'
        }).then(function(res) {
          skills = res.data;
          cb(skills);
        }.bind(this))
      }
    }

    this.getSkill = function(skillID, cb) {
      this.getSkills(function(skills) {
        for (var i = 0; i < skills.length; i++) {
          if (skills[i]._id === skillID) {
            return cb(skills[i]);
          }
        }
      })
    }

    this.activeSkill = function() {
      return active;
    }

    this.setActiveSkill = function(skillID) {
      this.getSkills(function(skills) {
        for (var i = 0; i < skills.length; i++) {
          if (skills[i]._id === skillID) {
            return changeSkill.call(this, skills[i]);
          }
        }
      }.bind(this));
    }
  });
