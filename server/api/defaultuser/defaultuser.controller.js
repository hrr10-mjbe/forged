'use strict';

var User = require('../user/user.model');
var Skilltree = require('../skilltree/skilltree.model');

exports.defaultUser = function(req, res, next) {
  var user = new User();
  Skilltree.findOneAsync({name: })
  res.json(user);
}
