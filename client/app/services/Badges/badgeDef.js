(function badgeDefs() {
  var map = {};

  window.checkBadge = function(badgeDefId, studentData) {
    return map[badgeDefId](studentData);
  }
})