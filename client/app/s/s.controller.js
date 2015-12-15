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
    constructor() {
     
    }
    go() {
      console.log(this.correct);
    }
  }

  angular.module('hrr10MjbeApp')
    .controller('SCtrl', MainController);

})();
