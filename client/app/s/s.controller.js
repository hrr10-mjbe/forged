'use strict';

(function() {

  class SController {
    constructor(Problems, Skills) {
      this.complete = 'false';
      this.type = Problems.currentProblemSet();
      this.Skills = Skills;
      this.skills = Skills.getUserSkills();
    }

    finish() {
      console.log(this.correct);
      console.log(this.complete);
      if (this.complete === 'true') {
        var newBadges = this.Skills.completeSkill();
        if (newBadges.length) {
          //show them
        }
      }
    }
  }

  angular.module('hrr10MjbeApp')
    .controller('SCtrl', SController);

})();
