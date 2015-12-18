'use strict';

(function() {

  class SController {
    constructor(Skills, Student, $state, $stateParams) {
      this.complete = 'false';
      Skills.getSkill($stateParams.id, function(skill) {
        this.type = skill.problemGenId;
        console.log(this.type);
      }.bind(this));      
      this.Student = Student;
      this.$state = $state;
    }

    finish() {
      if (this.complete === 'true') {
        this.Student.updateCurrentSkill(1);
        this.Student.awardBadges(function(badges) {
          console.log('new badges ' + badges);
        });
      }
    }
  }

  angular.module('hrr10MjbeApp')
    .controller('SCtrl', SController);

})();
