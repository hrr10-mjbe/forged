'use strict';

(function() {

  class SController {
    constructor(Skills, Student, $state, $stateParams) {
      this.complete = 'false';
      this.timerMinutes = 0;
      this.timerSeconds = 0;
      this.timerMinutesStore = 0;
      this.timerSecondsStore = 0;
      this.Student = Student;
      Skills.getSkill($stateParams.id, function(skill) {
        this.skill = skill;
        this.type = skill.problemGenId;
      }.bind(this));
      Student.getModifications(function(mod) {
        console.log(mod);
        this.showCanvas = mod.showWhiteboard;
      }.bind(this));
      Student.getLeaderboard(function(board) {
        this.leaderboard = JSON.stringify(board);
      }.bind(this));
    }

    finish() {
      if (this.complete === 'true') {
        console.log(this.Student);
        this.Student.addOrUpdateSkill(this.skill._id, 1);
        this.Student.awardBadges(function(badges) {
          console.log('new badges ' + badges);
        });
      }
    }

    polymerChange() {
      if (this.timerMinutes != this.timerMinutesStore || this.timerSeconds != timerSecondsStore) {
        console.log('time changed');
      }
      this.finish();
    }
  }

  angular.module('hrr10MjbeApp')
    .controller('SCtrl', SController);

})();
