(function badgeDef() {
  var skillCompleteBadge = function(studentData) {
    console.log(studentData);
    for (var key in studentData.skills) {
      console.log('true');
      return true;
    }
    return false;
  }
  
  var map = {
    0: skillCompleteBadge
  }

  window.checkBadge = function(badgeDefId, studentData) {
    console.log(studentData);
    console.log(map);
    console.log(badgeDefId);
    console.log(map[badgeDefId]);
    return map[badgeDefId](studentData);
  }
}());