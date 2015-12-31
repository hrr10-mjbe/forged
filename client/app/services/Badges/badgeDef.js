'use strict';

(function badgeDef() {
  var skillCompleteBadge = function(studentData) {
    for (var key in studentData.skills) {
      return true;
    }
    return false;
  }

  var twoSkillsBadge = function(studentData) {
    return studentData.skills.length > 1;
  }

  var map = {
    0: skillCompleteBadge,
    1: twoSkillsBadge
  }

  window.checkBadge = function(badgeDefId, studentData) {
    return map[badgeDefId](studentData);
  }
}());
