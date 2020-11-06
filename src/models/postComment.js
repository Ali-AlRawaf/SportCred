const mongoose = require("mongoose")

const postCommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

    text: {
      type: String,
      required: true,
      min: 5,
      max: 1000
    },

    createdAt: {
      type: Date, 
      default: Date.now
    }
})

module.exports = mongoose.model("PostComment", postCommentSchema)