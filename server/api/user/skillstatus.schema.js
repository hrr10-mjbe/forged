var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//this schema is used to store user progress on a given skill.
//It contains a reference to the skill and an integer representation of progress
var SkillStatusSchema = new Schema({
  skill: {
    type: Schema.Types.ObjectId,
    ref: 'Skill'
  },
  status: {
    type: Number,
    default: 0
  }
})

module.exports = SkillStatusSchema;