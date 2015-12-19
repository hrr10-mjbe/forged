'use strict';

angular.module('hrr10MjbeApp')
  .controller('NavbarCtrl', function($rootScope, $scope, Auth) {
    $scope.message = 'Hello';
    Auth.isLoggedIn(function(is) {
      $scope.loggedIn = is;
    })

    $rootScope.$on('$stateChangeStart', function() {
      Auth.isLoggedIn(function(is) {
        $scope.loggedIn = is;
      })
    })
  });
