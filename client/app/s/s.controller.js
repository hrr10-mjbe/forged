'use strict';

(function() {

  class SController {
    constructor(Problems, Skills, Student, $state, $stateParams) {
      this.complete = 'false';
      console.log($stateParams.id);
      this.type = Problems.currentProblemSet();
      this.Student = Student;
      this.$state = $state;
      if (!Skills.activeSkill()) {
        this.$state.go('main');
      }

    }

    finish() {
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
