'use strict';

(function() {

  class SController {
    constructor(Skills, Student, $state, $stateParams) {
      this.complete = 'false';
      this.timeLoaded = false;
      this.Student = Student;
      Skills.getSkill($stateParams.id, function(skill) {
        this.skill = skill;
        this.type = skill.problemGenId;
      }.bind(this));
      Student.getModifications(function(mod) {
        console.log(mod);
        this.showCanvas = mod.showWhiteboard;
        this.showTimer = mod.showTimer;
        this.showLeaderboard = mod.showLeaderboard;
      }.bind(this));
      Student.getLeaderboard(function(board) {
        this.leaderboard = JSON.stringify(board);
      }.bind(this));
      Student.getTime(function(time) {
        this.timerMinutes = Math.floor(time / 60);
        this.timerSeconds = time % 60;
        this.timerMinutesStore = Math.floor(time / 60);
        this.timerSecondsStore = time % 60;
        this.timeLoaded = true;
      }.bind(this))
    }

    finish() {
      if (this.complete === 'true') {
        console.log('completed skill');
        console.log(this.Student);
        this.Student.addOrUpdateSkill(this.skill._id, 1, function() {
          this.Student.awardBadges(function(badges) {
            console.log('new badges ' + badges);
          });
        }.bind(this));

      }
    }

    polymerChange() {
      if (this.timerMinutes != this.timerMinutesStore || this.timerSeconds != this.timerSecondsStore) {
        if (this.timeLoaded) {
          this.Student.updateTime(this.timerSeconds + 60 * this.timerMinutes);
        }
      }
      this.finish();
    }
  }

  angular.module('hrr10MjbeApp')
    .controller('SCtrl', SController);

})();
