const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
    min: 1,
    max: 1000
  },
  debateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Debate'
  }
})

module.exports = mongoose.model('Option', optionSchema)
