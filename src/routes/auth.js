const express = require('express');
const router = express.Router();
const User = require('../models/user')
const {registrationValidation} = require('../validations/user_validations');

router.post('/register', async (req, res) => {

  const {error} = registrationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try{
    const saved_user = await user.save();
    res.send(saved_user);
  }catch(err){
    res.status(400).send(err);
  }

});

module.exports = router;