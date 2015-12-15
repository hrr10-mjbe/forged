'use strict';

angular.module('hrr10MjbeApp')
  .controller('BadgesCtrl', function ($scope) {
    $scope.message = 'Hello';
    $scope.badges = JSON.stringify([{name:'addition',
                      image:'add',
                      achieved: true},
                      {name:'subtraction',
                      image:'build',
                      achieved: true},
                      {name:'multiplication',
                      image:'favorite',
                      achieved: false},
                      {name:'division',
                      image:'account-balance',
                      achieved: false},
                      {name:'addition',
                      image:'polymer',
                      achieved: true},
                      {name:'subtraction',
                      image:'accessibility',
                      achieved: true},
                      {name:'multiplication',
                      image:'assessment',
                      achieved: false},
                      {name:'division',
                      image:'bookmark',
                      achieved: false}]);
  });
