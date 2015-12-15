'use strict';

angular.module('hrr10MjbeApp')
  .service('Skills', function($http, User, Auth, Problems) {
    this.skills = undefined;
    this.activeSkill = undefined;

    function changeSkill(newSkill) {
      this.activeSkill = newSkill;
      Problems.setCurrentProblemSet(newSkill.problemGenId);
    }

   /*User.update({}, {
      type: 'hohoho',
      teacherInfo: {test: 'hi'}
    }, function() {
      console.log(User.get());
    }, function(err) {}).$promise;*/

    this.getSkills = function(cb) {
      if (this.skills) {
        cb(this.skills);
      } else {
        $http({
          method: 'GET',
          url: '/api/skills'
        }).then(function(res) {
          console.log(res);
          this.skills = res.data;
          cb(this.skills);
        }.bind(this))
      }
    }

    this.completeSkill = function() {
      Auth.updateSkill(this.activeSkill._id, 1);      
      /*User.update({}, update, function() {
        console.log(User.get());
      });*/
      this.activeSkill = undefined;
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
