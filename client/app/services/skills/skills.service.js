'use strict';

angular.module('hrr10MjbeApp')
  .service('Skills', function($http, Auth, Problems) {
    this.skills = undefined;
    this.activeSkill = undefined;

    function changeSkill(newSkill) {
      this.activeSkill = newSkill;
      console.log(this.activeSkill);
      Problems.setCurrentProblemSet(newSkill.problemGenId);
    }

    this.getSkills = function(cb) {
      if (this.skills) {
        cb(this.skills);
      } else {
        $http({
          method: 'GET',
          url: '/api/skills'
        }).then(function(res) {
          this.skills = res.data;
          cb(this.skills);
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
