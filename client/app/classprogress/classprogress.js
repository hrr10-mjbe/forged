'use strict';

angular.module('hrr10MjbeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('classprogress', {
        url: '/classprogress/:id',
        templateUrl: 'app/classprogress/classprogress.html',
        controller: 'ClassprogressCtrl'
      });
  });
