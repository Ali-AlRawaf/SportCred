const express = require('express');
const router = express.Router();
const Survey = require('../models/survey')
const SurveyQuestion = require('../models/surveyQuestion')
const User = require('../models/user')
const mongoose = require('mongoose')
const {surveyQuestionValidation} = require('../validations/survey_validations');

router.post('/new', async (req, res) => {

  // Find the user
  const user = await User.findOne({_id: req.body.user});
  if (!user) return res.status(400).send('Could not find user');

  // Validate the questions and their answers
  questions = req.body.survey.questions
  answers = req.body.survey.answers
  answerKeys = Object.keys(answers)

  const surveyQuestions = []

  for(let i = 0; i < questions.length; i++){
    q = questions[i];
    a = answers[answerKeys[i]];
    //console.log('question : ' + q + '\n' + 'answer: ' + a)
    const {error} = surveyQuestionValidation({question: q, answer: a});
    if (error){
      return res.status(400).send((error.details[0].message));
    }else{
      surveyQuestions.push(new SurveyQuestion({
        question: q,
        answer: a
      }))
    }
  }

  try{
    for (let i = 0; i < surveyQuestions.length; i++){
      await surveyQuestions[i].save();
    }

    const survey = new Survey({
      user: user,
      questions: surveyQuestions
    })

    await survey.save();
    return res.status(200).send('Survey saved');
  }catch(err){
    return res.status(400).send('error creating survey');
  }
});


module.exports = router;