'use strict';

(function() {

  class SController {
    constructor(Problems) {
      this.complete = 'false';
      this.type = Problems.currentProblemSet();
    }

    finish() {
      console.log(this.correct);
      console.log(this.complete);
    }
  }

  angular.module('hrr10MjbeApp')
    .controller('SCtrl', SController);

})();
