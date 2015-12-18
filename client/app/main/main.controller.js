'use strict';

(function() {

  class MainController {

    constructor($http, $state, Skills, Student) {
      this.$http = $http;
      this.$state = $state;
      this.Skills = Skills;
      Student.getSkills(function(skills) {
        this.skills = skills;
        console.log(skills);
      }.bind(this));
      this.awesomeThings = [];

      $http.get('/api/things').then(response => {
        this.awesomeThings = response.data;
      });
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }

    go() {
      console.log('going');
      console.log(this.inputtest);
      this.Skills.setActiveSkill(this.userselection);
      this.$state.go('s');
    }

    polymerChange() {
      if (this.userselection) {
        this.go();
      }
    }

  }

  angular.module('hrr10MjbeApp')
    .controller('MainController', MainController);

})();
