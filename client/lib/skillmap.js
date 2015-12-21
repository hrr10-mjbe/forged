(function() {
  var map = {
    0: mpgen.fixedMultiplication.bind(null, 0, 11, 1),
    1: mpgen.fixedMultiplication.bind(null, 0, 11, 2),
    2: mpgen.fixedMultiplication.bind(null, 0, 11, 3),
    3: mpgen.fixedMultiplication.bind(null, 0, 11, 4),
    4: mpgen.fixedDivision.bind(null, 0, 11, 1),
    5: mpgen.fixedDivision.bind(null, 0, 11, 2),
    6: mpgen.fixedDivision.bind(null, 0, 11, 3),
    7: mpgen.fixedDivision.bind(null, 0, 11, 4),
    8: mpgen.simpleAddition.bind(null, 0, 1001),
    9: mpgen.rounding.bind(null, 0, 101, 10),
    10: mpgen.rounding.bind(null, 0, 1001, 100),
    11: mpgen.rounding.bind(null, 0, 1001, [10, 100])
  };

  window.getProblemFunction = function(problemGenId) {
    return map[problemGenId];
  }
}());
