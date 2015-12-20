'use strict';

var User = require('../user/user.model');

exports.defaultUser = function(req, res, next) {
  console.log('in default user');
  var user = new User();
  res.json(user);
}
