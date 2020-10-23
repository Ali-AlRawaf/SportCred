const express = require('express');
const router = express.Router();
const Survey = require('../models/survey')
const SurveyQuestion = require('../models/surveyQuestion')
const User = require('../models/user')
const mongoose = require('mongoose')
const {surveyQuestionValidation} = require('../validations/survey_validations');

router.post('/new', async (req, res) => {

  // Find the user
  const user = await User.findOne({_id: req.body.user}).catch(error => console.log('invalid user id'));
  if (!user) return res.status(400).send('Could not find user');

  // Validate the questions and their answers
  const questions = []

  for(let i = 0; i < req.body.questions.length; i++){
    q = req.body.questions[i];
    const {error} = surveyQuestionValidation({question: q.question, answer: q.answer});
    if (error){
      return res.status(400).send((error.details[0].message));
    }else{
      questions.push(new SurveyQuestion({
        question: q.question,
        answer: q.answer
      }))
    }
  }

  // Create the survey
  result = {}

  try{
    for (let i = 0; i < questions.length; i++){
      await questions[i].save();
    }

    const survey = new Survey({
      user: user,
      questions: questions
    })

    await survey.save();
    res.status(200).send('Survey saved');
  }catch(err){
    res.status.send('error creating survey');
  }

  return result

});


module.exports = router;