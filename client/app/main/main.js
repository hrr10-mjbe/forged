'use strict';

angular.module('hrr10MjbeApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
  });
