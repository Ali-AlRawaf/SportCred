const Joi = require('@hapi/joi')

const registrationValidation = (data) => {

  const schema = Joi.object({
    username: Joi.string().min(5).max(25).required(),
    email: Joi.string().min(5).max(255).required().email(),
    status: Joi.string().max(200),
    bio: Joi.string().max(255),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password'))
  })

  return schema.validate(data)
}

const loginValidation = (data) => {

  const schema = Joi.object({
    username: Joi.string().min(5).max(25).required(),
    password: Joi.string().min(6).required(),
  })

  return schema.validate(data)
}

const EditProfileValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(25),
    email: Joi.string().min(5).max(255).email(),
    status: Joi.string().max(200),
    bio: Joi.string().max(255),
    password: Joi.string().min(6),
  })
  return schema.validate(data)
}

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
module.exports.EditProfileValidation = EditProfileValidation;