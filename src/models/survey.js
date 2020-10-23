const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SurveyQuestion'
  }]

})

module.exports = mongoose.model('Survey', surveySchema)