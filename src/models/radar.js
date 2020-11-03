const mongoose = require('mongoose')

const radarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = mongoose.model('Radar', radarSchema)
