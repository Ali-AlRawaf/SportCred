const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {registrationValidation, loginValidation} = require('../validations/user_validations');

router.post('/register', async (req, res) => {

  // Front end validations
  const {error} = registrationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user already exists
  const username_exists = await User.findOne({username: req.body.username});
  if (username_exists) return res.status(400).send('User with this username already exists');

  const email_exists = await User.findOne({email: req.body.email});
  if (email_exists) return res.status(400).send('User with this email already exists');

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashed_password,
  });

  try{
    const saved_user = await user.save();
    res.send({user: user.id});
  }catch(err){
    res.status(400).send(err);
  }

});

router.post('/login', async (req, res) => {

  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find the user in the database
  const user = await User.findOne({username: req.body.username});
  if (!user) return res.status(400).send('username or password is incorrect');

  // Check password
  const valid_password = await bcrypt.compare(req.body.password, user.password);
  if (!valid_password) return res.status(400).send('username or password is incorrect');

  // Create a remember me token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)

});


module.exports = router;