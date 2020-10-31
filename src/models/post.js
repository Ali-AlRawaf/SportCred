const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

    title: {
        type: String,
        required: true,
        min: 5,
        max: 250
    },

    description: { 
        type: String,
        required: true,
        min: 5,
        max: 1000
    },

    createdAt: {
        type: Date, 
        default: Date.now
    },
    
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostComment",
        }
    ]
    
})

module.exports = mongoose.model("Post", postSchema)