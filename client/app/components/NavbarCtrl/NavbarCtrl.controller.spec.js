'use strict';

describe('Controller: NavbarCtrlCtrl', function () {

  // load the controller's module
  beforeEach(module('hrr10MjbeApp'));

  var NavbarCtrlCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavbarCtrlCtrl = $controller('NavbarCtrlCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
