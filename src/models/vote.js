const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  value: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  optionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option'
  },
  debateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Debate'
  }
})

module.exports = mongoose.model('Vote', voteSchema)
