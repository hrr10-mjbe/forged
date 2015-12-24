'use strict';

describe('Controller: NavbarCtrl', function() {

  // load the controller's module
  beforeEach(module('hrr10MjbeApp'));

  beforeEach(module(function($provide) {
    var mockAuth = {
      loggedIn: false,
      type: '',
      isLoggedIn: function(cb) {
        cb(loggedIn);
      },
      getCurrentUser: function(cb) {
        cb({
          name: 'test name',
          type: type
        });
      }
    };
    $provide.value('Auth', mockAuth);
  }));

  var NavbarCtrl, scope, Auth;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _Auth_) {
    Auth = _Auth_;
    scope = $rootScope.$new();
    NavbarCtrl = $controller('NavbarCtrl', {
      $scope: scope
    });
  }));

  /*it('should detect when a user is logged in', function() {
    Auth.loggedIn = true;
    expect(scope.loggedIn).to.be.true;
  });*/
});
