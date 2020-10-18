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

  bio: {
    type: String,
    max: 255
  },

  password: {
    type: String,
    required: true,
    min: 6
  },

})

module.exports = mongoose.model('User', userSchema)
