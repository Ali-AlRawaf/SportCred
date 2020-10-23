const mongoose = require('mongoose')

const surveyQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    max: 100
  },

  answer: {
    type: String,
    required: true,
    max: 100
  },

})

module.exports = mongoose.model('SurveyQuestion', surveyQuestionSchema)