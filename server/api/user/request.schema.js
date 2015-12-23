var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//this schema obviously duplicates data from elsewhere
//but it's immutable data so there's no harm in duplicating it and saving a populate()
var RequestSchema = new Schema({
  student: {
    _id: Schema.Types.ObjectId,
    name: String,
    email: String
  },
  teacher: {
    _id: Schema.Types.ObjectId,
    name: String,
    email: String
  },
  class: {
    name: String,
      _id: Schema.Types.ObjectId
  }
});

module.exports = RequestSchema;