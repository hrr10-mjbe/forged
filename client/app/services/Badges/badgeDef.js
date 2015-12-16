(function badgeDef() {
  var skillCompleteBadge = function(studentData) {
    for (var key in studentData.skills) {
      return true;
    }
    return false;
  }

  var map = {
    0: skillCompleteBadge
  }

  window.checkBadge = function(badgeDefId, studentData) {
    return map[badgeDefId](studentData);
  }
}());
