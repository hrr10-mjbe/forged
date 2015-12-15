'use strict';

angular.module('hrr10MjbeApp')
  .service('Skills', function($http, User) {

    User.update({}, {
      type: 'hohoho',
      teacherInfo: {test: 'hi'}
    }, function() {
      console.log(User.get());
    }, function(err) {}).$promise;

    this.getSkills = function(cb) {
      if (skills) {
        cb(skills);
      } else {
        $http({
          method: 'GET',
          url: '/api/skills'
        }).then(function(res) {
          console.log(res);
          skills = res.data;
          cb(skills);
        })
      }
    }
  });
