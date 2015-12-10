'use strict';

angular.module('hrr10MjbeApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('newroute', {
        url: '/new',
        templateUrl: 'app/main/newroute.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });
