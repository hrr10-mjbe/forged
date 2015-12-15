/*'use strict';

angular.module('hrr10MjbeApp')
  .controller('SCtrl', function ($scope, Problems) {
    $scope.message = 'Hello';
    $scope.type = Problems.currentProblemSet();
    $scope.complete = 'false';
    $scope.finish = function() {
      console.log('finished');
      console.log($scope.complete);
    };
    $scope.go = function() {
      console.log('going');
      console.log($scope.userselction);
    }
  });*/

'use strict';

(function() {

  class MainController {

    constructor($http, $state, Problems, Skills) {
      this.$http = $http;
      this.$state = $state;
      this.Problems = Problems;
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
      this.Problems.setCurrentProblemSet(this.userselection);
      console.log(this.correct);
      console.log(this.userselection);
      this.$state.go('s');
    }

  }

  angular.module('hrr10MjbeApp')
    .controller('SCtrl', MainController);

})();
