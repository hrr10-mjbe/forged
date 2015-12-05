'use strict';

angular.module('hrr10MjbeApp.auth', [
  'hrr10MjbeApp.constants',
  'hrr10MjbeApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
