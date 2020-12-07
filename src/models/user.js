const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 25
  },

  email: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },

  status: {
    type: String,
    max: 200
  },

  acs: {
    type: Number,
    max: 1100,
    default: 100
  },

  bio: {
    type: String,
    max: 255
  },

  description: {
    type: String,
    max: 255
  },

  password: {
    type: String,
    required: true,
    min: 6
  },

  activated: {
    type: Boolean,
    default: false,
  }

})

module.exports = mongoose.model('User', userSchema)
