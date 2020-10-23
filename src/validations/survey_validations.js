const Joi = require('@hapi/joi')

const surveyQuestionValidation = (data) => {

  const schema = Joi.object({
    question: Joi.string().max(100).required(),
    answer: Joi.string().max(100).required()
  })

  return schema.validate(data);
}


module.exports.surveyQuestionValidation = surveyQuestionValidation;