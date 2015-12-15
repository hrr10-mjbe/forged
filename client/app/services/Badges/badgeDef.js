(function badgeDef() {
  var skillCompleteBadge = function(studentData) {
    return studentData.skills.length > 1;
  }
  
  var map = {
    0: skillCompleteBadge
  }

  window.checkBadge = function(badgeDefId, studentData) {
    return map[badgeDefId](studentData);
  }
}());