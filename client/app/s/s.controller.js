'use strict';

(function() {

  class SController {
    constructor(Problems, Student) {
      this.complete = 'false';
      this.type = Problems.currentProblemSet();
      this.Student = Student;
    }

    finish() {
      console.log(this.correct);
      console.log(this.complete);
      if (this.complete === 'true') {
        this.Student.updateCurrentSkill(1);
        this.Student.awardBadges(function(badges) {
          console.log('new badges ' + badges);
        })
      }
    }
  }

  angular.module('hrr10MjbeApp')
    .controller('SCtrl', SController);

})();
