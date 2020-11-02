const Joi = require('@hapi/joi')

const postCommentValidation = (data) => {

  const schema = Joi.object({
    text: Joi.string().min(5).max(1000).required(),
  })

  return schema.validate(data)
}

module.exports.postCommentValidation = postCommentValidation;