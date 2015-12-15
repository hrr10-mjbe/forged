'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var BadgeSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  badgeDefId: Number,
  image: String
});

module.exports = mongoose.model('Badge', BadgeSchema);
