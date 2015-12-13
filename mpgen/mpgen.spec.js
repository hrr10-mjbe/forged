var chai = require('chai');
var mpgen = require('./mpgen');

describe('Math Problem Generator', function() {
  var SAMPLE_SIZE = 1000;
  describe('Simple Addition', function() {
    it('should generate correct problems', function() {
      for (var i = 0; i < SAMPLE_SIZE; i++) {
        var problem = mpgen.simpleAddition(0, 1000);
        expect(problem.answer).to.equal(problem.nums[0] + problem.nums[1]);
      }
    });
    it('should generate problems with all numbers within range', function() {
      for (var i = 0; i < SAMPLE_SIZE; i++) {
        var problem = mpgen.simpleAddition(0, 10);
        expect(problem.answer).to.be.within(0, 10);
        expect(problem.nums[0]).to.be.within(0, 10);
        expect(problem.nums[1]).to.be.within(0, 10);
      }
    });
  });

});
