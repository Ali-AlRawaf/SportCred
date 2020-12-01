const mongoose = require('mongoose')

const pickSchema = new mongoose.Schema({

  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },

  topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PickTopic'
  },

  pick: {
    type: String,
  }

})

module.exports = mongoose.model('Pick', pickSchema)
