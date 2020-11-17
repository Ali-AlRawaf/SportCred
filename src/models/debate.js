const mongoose = require('mongoose')

const debateSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    min: 1,
    max: 1000
  },
  winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  options: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option'
  }],
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Debate', debateSchema)
