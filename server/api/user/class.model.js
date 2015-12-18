var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ClassSchema = new Schema({
  name: String,
  students: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Class', ClassSchema);