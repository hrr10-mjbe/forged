'use strict';

angular.module('hrr10MjbeApp')
  .service('Skills', function($http) {
    var skills;
    var tree = {};

    this.getSkillTree = function(root, cb) {
      if (tree[root]) {
        return cb(tree[root]);
      }
      $http({
        method: 'GET',
        url: '/api/skilltree/' + root
      }).then(function(res) {
        tree[root] = res.data;
        cb(tree[root]);
      })
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
        })
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
  });
