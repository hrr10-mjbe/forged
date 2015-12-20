'use strict';

angular.module('hrr10MjbeApp', [
    'hrr10MjbeApp.auth',
    'hrr10MjbeApp.admin',
    'hrr10MjbeApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'validation.match',
    'bindPolymer'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .run(function($rootScope, $state, Auth) {
    $rootScope.$on("$stateChangeStart", function(event, toState) {
      if (toState.auth && !Auth.isLoggedIn()) {
        $state.go('login');
        event.preventDefault();
      }
    });
  });;
