'use strict';

angular.module('hrr10MjbeApp', [
  'hrr10MjbeApp.auth',
  'hrr10MjbeApp.admin',
  'hrr10MjbeApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
