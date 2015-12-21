'use strict';

var User = require('../user/user.model');
var Skilltree = require('../skilltree/skilltree.model');

exports.defaultUser = function(req, res, next) {
  var user = new User();
  //TODO the default user should have a skilltree, or maybe just populate it client side?
  //Skilltree.findOneAsync({name: })
  res.json(user);
}
