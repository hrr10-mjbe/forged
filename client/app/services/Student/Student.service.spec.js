'use strict';

describe('Service: Student', function () {

  // load the service's module
  beforeEach(module('hrr10MjbeApp'));

  // instantiate service
  var Student;
  beforeEach(inject(function (_Student_) {
    Student = _Student_;
  }));

  it('should do something', function () {
    expect(!!Student).to.be.true;
  });

});
