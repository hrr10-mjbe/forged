/*
Simple math problem generator.
To use client side:
<script src="<PATH>"></script>
var sample = mpgen.simpleAddition(0, 1000);

To use server side:
var mpgen = require('<path>');
var sample = mpgen.simpleAddition(0, 1000);
--------------------------------------------------------
API:

All methods return an object with at least the following properties (some types of problems have additional properties):
disp: A string representation of the problem
answer: The integer answer to the problem
gen: An object which can be stored and used to regenerate the same problem in the future.

All min-max ranges are inclusive for min, exclusive for max.

mpgen.simpleAddition(min, max) 
  returns an integer addition problem with ALL values (including answer) between min and max.
  Note that this means that max must be at least twice min.

mpgen.simpleSubtraction(min, max)
  returns an integer subtraction problem with ALL values (including answer) between min and max.
  Note that this means that max must be at least twice min.

mpgen.simpleMultiplication(min, max)
  returns an integer multiplication problem with multipliers between min and max (answer may be outside this range)

mpgen.fixedMultiplication(min, max, fixed)
  returns an integer multiplication problem with one multiplier fixed
  So fixedMultiplication(1, 13, 12) returns a problem in the form [1-12] * 12 = 

mpgen.fixedDivision(min, max, fixed)
  returns an integer division problem with the divisor fixed
  fixedDivision(4, 17, 4) will return either 4 / 4, 8 / 4, 12 / 4, or 16 / 4

mpgen.rounding(min, max, roundTo)
  returns an integer rounding problem. roundTo can be either a single number or an array of numbers, the place value to be rounded to
  Ex. rounding(100, 700, [10, 100]) will return a problem asking the student to round a number between 100 and 700 to the nearest 10 or 100.

mpgen.getProblem(gen)
  passing the gen object of a previously generated problem to this function will cause it to return an identical problem
*/

(function(env) {

  /*Xorshift+ generator:

  Copyright (c) 2014 Andreas Madsen & Emil Bay

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */

  /**
   * Create a pseudorandom number generator, with a seed.
   * @param {array} seed "128-bit" integer, composed of 4x32-bit
   * integers in big endian order.
   */
  function XorShift(seed) {
    // uint64_t s = [seed ...]
    this._state0U = 0;
    this._state0L = seed / 65535;
    this._state1U = 0;
    this._state1L = seed % 65536;
  }

  /**
   * Returns a 64bit random number as a 2x32bit array
   * @return {array}
   */
  XorShift.prototype.randomint = function() {
    // uint64_t s1 = s[0]
    var s1U = this._state0U,
      s1L = this._state0L;
    // uint64_t s0 = s[1]
    var s0U = this._state1U,
      s0L = this._state1L;

    // s[0] = s0
    this._state0U = s0U;
    this._state0L = s0L;

    // - t1 = [0, 0]
    var t1U = 0,
      t1L = 0;
    // - t2 = [0, 0]
    var t2U = 0,
      t2L = 0;

    // s1 ^= s1 << 23;
    // :: t1 = s1 << 23
    var a1 = 23;
    var m1 = 0xFFFFFFFF << (32 - a1);
    t1U = (s1U << a1) | ((s1L & m1) >>> (32 - a1));
    t1L = s1L << a1;
    // :: s1 = s1 ^ t1
    s1U = s1U ^ t1U;
    s1L = s1L ^ t1L;

    // t1 = ( s1 ^ s0 ^ ( s1 >> 17 ) ^ ( s0 >> 26 ) )
    // :: t1 = s1 ^ s0
    t1U = s1U ^ s0U;
    t1L = s1L ^ s0L;
    // :: t2 = s1 >> 17
    var a2 = 17;
    var m2 = 0xFFFFFFFF >>> (32 - a2);
    t2U = s1U >>> a2;
    t2L = (s1L >>> a2) | ((s1U & m2) << (32 - a2));
    // :: t1 = t1 ^ t2
    t1U = t1U ^ t2U;
    t1L = t1L ^ t2L;
    // :: t2 = s0 >> 26
    var a3 = 26;
    var m3 = 0xFFFFFFFF >>> (32 - a3);
    t2U = s0U >>> a3;
    t2L = (s0L >>> a3) | ((s0U & m3) << (32 - a3));
    // :: t1 = t1 ^ t2
    t1U = t1U ^ t2U;
    t1L = t1L ^ t2L;

    // s[1] = t1
    this._state1U = t1U;
    this._state1L = t1L;

    // return t1 + s0
    // :: t2 = t1 + s0
    var sumL = (t1L >>> 0) + (s0L >>> 0);
    t2U = (t1U + s0U + (sumL / 2 >>> 31)) >>> 0;
    t2L = sumL >>> 0;

    // :: ret t2
    return [t2U, t2L];
  };

  /**
   * Returns a random number normalized [0, 1), just like Math.random()
   * @return {number}
   */
  XorShift.prototype.random = function() {
    var t2 = this.randomint();

    // :: ret t2 / 2**64
    return (t2[0] * 4294967296 + t2[1]) / 18446744073709551616;
  };

  //----------------------------------------------------------------------------------------------
  //Begin problem generator code

  function prepareRNG(seed) {
    seed = seed || Date.now();
    var random = new XorShift(seed);
    random.seed = seed;
    for (var i = 0; i < 20; i++) {
      random.randomint();
    }
    return random;
  }

  function intRange(a, b, rand) {
    return Math.floor(a + rand.random() * (b - a));
  }

  env.getProblem = function(gen) {
    return funcMap[gen[0]].apply(this, gen.slice(1));
  }

  var standardDisplay = function(nums, operator) {
    return 'What is ' + nums[0] + ' ' + operator + ' ' + nums[1] + '?';
  }

  env.simpleAddition = function(min, max, seed) {
    var rand = prepareRNG(seed);
    var answer = intRange(2 * min, max, rand);
    var num1 = intRange(min, answer - min, rand);
    var num2 = answer - num1;
    return {
      nums: [num1, num2],
      answer: answer,
      operator: '+',
      disp: standardDisplay([num1, num2], '+'),
      gen: [types.SIMPLE_ADDITION, min, max, rand.seed]
    }
  };

  env.simpleSubtraction = function(min, max, seed) {
    var rand = prepareRNG(seed);
    var num1 = intRange(2 * min, max, rand);
    var num2 = intRange(min, num1 - min, rand);
    var answer = num1 - num2;
    return {
      nums: [num1, num2],
      answer: answer,
      operator: '-',
      disp: standardDisplay([num1, num2], '-'),
      gen: [types.SIMPLE_SUBTRACTION, min, max, rand.seed]
    }
  };

  //min, max refer only to multiplied values, NOT answer
  env.simpleMultiplication = function(min, max, seed) {
    var rand = prepareRNG(seed);
    var num1 = intRange(min, max, rand);
    var num2 = intRange(min, max, rand);
    var answer = num1 * num2;
    return {
      nums: [num1, num2],
      answer: answer,
      operator: '*',
      disp: standardDisplay([num1, num2], '*'),
      gen: [types.SIMPLE_MULTIPLICATION, min, max, rand.seed]
    }
  };

  env.fixedMultiplication = function(min, max, fixed, seed) {
    var rand = prepareRNG(seed);
    var num1 = intRange(min, max, rand);
    var num2 = fixed;
    var answer = num1 * num2;
    return {
      nums: [num1, num2],
      answer: answer,
      disp: standardDisplay([num1, num2], '*'),
      gen: [types.FIXED_MULTIPLICATION, min, max, fixed, rand.seed]
    }
  }

  env.fixedDivision = function(min, max, fixed, seed) {
    var rand = prepareRNG(seed);
    var num1 = intRange(Math.ceil(min / fixed), Math.floor(max / fixed), rand) * fixed;
    var num2 = fixed;
    var answer = num1 / num2;
    return {
      nums: [num1, num2],
      answer: answer,
      disp: standardDisplay([num1, num2], '/'),
      gen: [types.FIXED_DIVISION, min, max, fixed, rand.seed]
    }
  }

  env.rounding = function(min, max, roundTo, seed) {
    //TODO: if you want this to handle decimals you'll need to account for bad decimal math
    var rand = prepareRNG(seed);
    var num = intRange(min, max, rand);
    var round = Array.isArray(roundTo) ? roundTo[intRange(0, roundTo.length, rand)] : roundTo;
    var answer = Math.round(num / round) * round;
    return {
      num: num,
      round: round,
      answer: answer,
      disp: 'Round ' + num + ' to the nearest ' + round + '.',
      gen: [types.ROUNDING, min, max, roundTo, rand.seed]
    }
  }

  var types = {
    SIMPLE_ADDITION: 0,
    SIMPLE_SUBTRACTION: 1,
    SIMPLE_MULTIPLICATION: 2,
    ROUNDING: 3,
    FIXED_MULTIPLICATION: 4,
    FIXED_DIVISION: 5
  }
  var funcMap = {};
  funcMap[types.SIMPLE_ADDITION] = env.simpleAddition;
  funcMap[types.SIMPLE_SUBTRACTION] = env.simpleSubtraction;
  funcMap[types.SIMPLE_MULTIPLICATION] = env.simpleMultiplication;
  funcMap[types.ROUNDING] = env.rounding;
  funcMap[types.FIXED_MULTIPLICATION] = env.fixedMultiplication;
  funcMap[types.FIXED_DIVISION] = env.fixedDivision;

})(typeof exports === 'undefined' ? this['mpgen'] = {} : exports);