'use strict';

var User = require('../user/user.model');

exports.defaultUser = function(req, res, next) {
  var user = new User();
  res.json(user);
}
