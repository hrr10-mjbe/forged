'use strict';

angular.module('hrr10MjbeApp')
  .controller('NavbarCtrl', function($rootScope, $scope, Auth) {
    $rootScope.$on('$stateChangeStart', function() {
      Auth.isLoggedIn(function(is) {
        $scope.loggedIn = is;
      })
      Auth.isTeacher(function(is) {
        $scope.isTeacher = is;
      })
      Auth.getCurrentUser(function(user) {
        $scope.name = user.name;
      })
    })
  });
