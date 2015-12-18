'use strict';

angular.module('hrr10MjbeApp')
  .service('Skills', function($http, Auth, Problems, Badges) {
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

    this.completeSkill = function() {
      console.log(this.activeSkill);
      Auth.updateSkill(this.activeSkill._id, 1);
      var newBadges = Badges.awardBadges();
      Auth.awardBadges(newBadges);
      //this.activeSkill = undefined;
      return newBadges;
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
