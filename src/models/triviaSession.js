const mongoose = require('mongoose')

const player = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    totalScore: {
        type: Number
    }
})


const answerOptionSchema = new mongoose.Schema({
    optionNumber: {
        type: Number
    },
    answerBody: {
        type: String,
        min: 1,
        max: 100
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
});

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        min: 5,
        max: 1000
    },
    answers: {
        type: [answerOptionSchema],
        default: undefined,
        // validate: {
        //     validator: function (val) {
        //         return value && value.length === 4;
        //     },
        //     message: 'There should be 4 answers.'
        // }
    }
});

const triviaSession = new mongoose.Schema({
    players: [{
        type: player,
    }],
    questions: {
        type: [questionSchema],

        // validate: {
        //     validator: function (val) {
        //         return value && value.length === 4;
        //     },
        //     message: "Must be 4 questions"
        // }
    },
})

module.exports = mongoose.model('triviaSession', triviaSession)
