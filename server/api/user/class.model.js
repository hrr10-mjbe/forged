var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = new Schema({
  name: String,
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  modifications: { // UI/behavior modifications to apply to this class
    showTimer: { //whether a timer should be shown on the problems page
      type: Boolean,
      default: false
    },
    showWhiteboard: { //whether the student can use the whiteboard on the problems page
      type: Boolean,
      default: true
    },
    showLeaderboard: { //whether to show the student a leaderboard of the points of other students in her class
      type: Boolean,
      default: false
    }
  }
});

module.exports = mongoose.model('Class', ClassSchema);
