'use strict';

angular.module('hrr10MjbeApp')
  .controller('NavbarCtrl', function ($rootScope, $scope, Auth) {
    $scope.message = 'Hello';
    Auth.isLoggedIn(function(is) {
      $scope.loggedIn = is;
    })
 // $scope.loggedIn = Auth.isLoggedIn();

  $rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){ 
    Auth.isLoggedIn(function(is) {
      $scope.loggedIn = is;
    })
})
  });
