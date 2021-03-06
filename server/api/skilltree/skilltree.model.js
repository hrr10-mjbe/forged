'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var tree = require('mongoose-path-tree');
var Schema = mongoose.Schema;

var SkilltreeSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  skills: [{type: Schema.Types.ObjectId, ref: 'Skill'}]
});

SkilltreeSchema.plugin(tree);

module.exports = mongoose.model('Skilltree', SkilltreeSchema);
