'use strict';

var User = require('../user/user.model');
var Skilltree = require('../skilltree/skilltree.model');

exports.makeUser = function(data, cb) {
  var user = new User(data);
  Skilltree.findOneAsync({name: 'Math'})
  .then(function(tree) {
    user.skillRoot = tree._id;
    cb(user);
  });
}

exports.defaultUser = function(req, res, next) {
  exports.makeUser(function(user) {
    res.json(user);
  });    
}
