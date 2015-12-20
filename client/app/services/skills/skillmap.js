var map = {
  0: mpgen.simpleAddition.bind(null, 0, 10),
}
function getProblemBySetId(id) {
    console.log(id);
    if (id === 0) {
      return mpgen.simpleAddition(0, 10);
    }
     else if (id === 1) {
      return mpgen.simpleAddition(0, 1000);
    }
     if (id === 2) {
      return mpgen.simpleSubtraction(0, 10);
    }
  }