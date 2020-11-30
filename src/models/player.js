const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    totalScore: {
        type: Number
    }
})

module.exports = mongoose.model('PlayerSchema', playerScehma)
