'use strict';

angular.module('hrr10MjbeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('s', {
        url: '/s/:id',
        templateUrl: 'app/s/s.html',
        controller: 'SCtrl',
        controllerAs: 's'
      });
  });



