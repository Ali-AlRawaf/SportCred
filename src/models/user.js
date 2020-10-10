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
    min: 6,
    max: 255,
  },

  password: {
    type: String,
    required: true,
    min: 6
  },

  date: {
    type: Date,
    default: Date.now,
  },

})

module.exports = mongoose.model('User', userSchema)
