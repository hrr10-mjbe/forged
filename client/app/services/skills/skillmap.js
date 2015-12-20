(function() {
  var map = {
    0: mpgen.fixedMultiplication.bind(null, 0, 11, 1),
    1: mpgen.fixedMultiplication.bind(null, 0, 11, 2),
    2: mpgen.fixedMultiplication.bind(null, 0, 11, 3),
    3: mpgen.fixedMultiplication.bind(null, 0, 11, 4)
  };

  window.getProblemFunction = function(problemGenId) {
    return map[problemGenId];
  }
}());
