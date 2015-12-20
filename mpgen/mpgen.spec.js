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
        var problem = mpgen.simpleAddition(100, 1000);
        expect(problem.answer).to.be.within(100, 999);
        expect(problem.nums[0]).to.be.within(100, 999);
        expect(problem.nums[1]).to.be.within(100, 999);
      }
    });
    it('should correctly retrieve previous problems', function() {
      for (var i = 0; i < SAMPLE_SIZE; i++) {
        var problem = mpgen.simpleAddition(0, 1000);
        var retrieval = mpgen.getProblem(problem.gen);
        expect(problem.answer).to.equal(retrieval.answer);
        expect(problem.nums[0]).to.equal(retrieval.nums[0]);
        expect(problem.nums[1]).to.equal(retrieval.nums[1]);
        expect(problem.operator).to.equal(retrieval.operator);
      }
    })
  });

  describe('Simple Subtraction', function() {
    it('should generate correct problems', function() {
      for (var i = 0; i < SAMPLE_SIZE; i++) {
        var problem = mpgen.simpleSubtraction(0, 1000);
        expect(problem.answer).to.equal(problem.nums[0] - problem.nums[1]);
      }
    });
    it('should generate problems with all numbers within range', function() {
      for (var i = 0; i < SAMPLE_SIZE; i++) {
        var problem = mpgen.simpleSubtraction(100, 1000);
        expect(problem.answer).to.be.within(100, 999);
        expect(problem.nums[0]).to.be.within(100, 999);
        expect(problem.nums[1]).to.be.within(100, 999);
      }
    });
    it('should correctly retrieve previous problems', function() {
      for (var i = 0; i < SAMPLE_SIZE; i++) {
        var problem = mpgen.simpleSubtraction(0, 1000);
        var retrieval = mpgen.getProblem(problem.gen);
        expect(problem.answer).to.equal(retrieval.answer);
        expect(problem.nums[0]).to.equal(retrieval.nums[0]);
        expect(problem.nums[1]).to.equal(retrieval.nums[1]);
        expect(problem.operator).to.equal(retrieval.operator);
      }
    });
  });

  describe('Simple Multiplication', function() {
    it('should generate correct problems', function() {
      for (var i = 0; i < SAMPLE_SIZE; i++) {
        var problem = mpgen.simpleMultiplication(0, 1000);
        expect(problem.answer).to.equal(problem.nums[0] * problem.nums[1]);
      }
    });
    it('should generate problems with all numbers within range', function() {
      for (var i = 0; i < SAMPLE_SIZE; i++) {
        var problem = mpgen.simpleMultiplication(100, 1000);
        expect(problem.nums[0]).to.be.within(100, 999);
        expect(problem.nums[1]).to.be.within(100, 999);
      }
    });
    it('should correctly retrieve previous problems', function() {
      for (var i = 0; i < SAMPLE_SIZE; i++) {
        var problem = mpgen.simpleMultiplication(0, 1000);
        var retrieval = mpgen.getProblem(problem.gen);
        expect(problem.answer).to.equal(retrieval.answer);
        expect(problem.nums[0]).to.equal(retrieval.nums[0]);
        expect(problem.nums[1]).to.equal(retrieval.nums[1]);
        expect(problem.operator).to.equal(retrieval.operator);
      }
    });
  });

  describe('Rounding', function() {
    it('should generate correct problems', function() {
      for (var i = 0; i < SAMPLE_SIZE; i++) {
        var problem = mpgen.rounding(0, 100, 100);
        expect(problem.answer).to.equal(problem.num >= 50 ? 100 : 0);
        var problem = mpgen.rounding(0, 100, 10);
        expect(problem.answer).to.equal(problem.num % 10 >= 5 ? problem.num + 10 - problem.num % 10 : problem.num - (10 - problem.num % 10));
      }
    });
    it('should generate problems with all numbers within range', function() {
      for (var i = 0; i < SAMPLE_SIZE; i++) {
        var problem = mpgen.rounding(100, 1000, [10, 100, 1000]);
        expect(problem.num).to.be.within(100, 999);
        expect(problem.round === 10 || problem.round === 100 || problem.round === 1000).to.be(true);
      }
    });
    it('should correctly retrieve previous problems', function() {
      for (var i = 0; i < SAMPLE_SIZE; i++) {
        var problem = mpgen.rounding(0, 1000, [10, 100, 1000]);
        var retrieval = mpgen.getProblem(problem.gen);
        expect(problem.answer).to.equal(retrieval.answer);
        expect(problem.num).to.equal(retrieval.num);
        expect(problem.round).to.equal(retrieval.round);
        expect(problem.disp).to.equal(retrieval.disp);
      }
    });
  });
});
