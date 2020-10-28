const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const User = require('../models/user');
const activationToken = require('../models/token');
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

  const token = new activationToken({
    _userId: user._id,
    token: crypto.randomBytes(16).toString('hex')
  });

  try{
    await user.save();
    await token.save();
  }catch(err){
    res.status(400).send(err);
  }

  var transporter = nodemailer.createTransport({ 
    service: 'Gmail', 
    auth: { 
      user: process.env.SPORTCRED_EMAIL, 
      pass: process.env.SPORTCRED_PASS 
    } 
  });

  var mailOptions = { 
    from: 'no-reply@sportcred.com', 
    to: user.email, 
    subject: 'Account Verification Link', 
    text: 'Hello '+ req.body.username +',\n\n' + 'Please verify your account by clicking the link: ' + 
          '\nhttp:\/\/localhost:5000\/user\/confirm\/' + user.email + '\/' + token.token + '\n\nThank You!\n' 
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) return res.status(500).send('Technical Issue!, Please click on resend to verify your Email.');

    return res.status(200).send({
      token: token.token,
      text: 'A verification email has been sent to ' + user.email +
            '. It will expire after one day. If you do not get the verification email, click on resend.'
    });
  });
});

router.post('/resend-activation', async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('username does not exist');

  if (user.isVerified) return res.status(200).send('This account has been already verified. Please log in.');

  var token = new activationToken({
    _userId: user._id, 
    token: crypto.randomBytes(16).toString('hex') 
  });

  try{
    await token.save();
  }catch(err){
    res.status(400).send(err);
  }

  var transporter = nodemailer.createTransport({ 
    service: 'Gmail', 
    auth: { 
      user: process.env.SPORTCRED_EMAIL, 
      pass: process.env.SPORTCRED_PASS
    } 
  });

  var mailOptions = { 
    from: 'no-reply@sportcred.com', 
    to: user.email, 
    subject: 'Account Verification Link', 
    text: 'Hello '+ user.username +',\n\n' + 'Please verify your account by clicking the link: ' + 
          '\nhttp:\/\/localhost:5000\/user\/confirm\/' + user.email + '\/' + token.token + '\n\nThank You!\n' 
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) return res.status(500).send('Technical Issue!, Please click on resend to verify your Email.');

    return res.status(200).send({
      token: token.token,
      text: 'A verification email has been sent to ' + user.email +
            '. It will expire after one day. If you do not get the verification email, click on resend.'
    });
  });
});

router.get('/confirm/:email/:token', async (req, res) => {
  const token = await Token.findOne({ token: req.params.token })
  if (!token) return res.status(400).send('Your verification link may have expired. Please click on resend for verify your Email.');
  
  const user = await User.findOne({_id: token._userId, email: req.params.email})
  if (!user) return res.status(400).send('We were unable to find a user for this verification. Please SignUp!');

  if(user.activated) return res.status(200).send({user: user._id, text: 'Account is activated. Please Login'});

  user.activated = true;
  await user.save(function (err) {
    if (err) return res.status(500).send(err.message);
    else return res.status(200).send({user: user._id, text: 'Your account has been successfully verified'});
  });
});

router.post('/login', async (req, res) => {

  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find the user in the database
  const user = await User.findOne({username: req.body.username});
  if (!user) return res.status(400).send('username does not exist');

  // Check password
  const valid_password = await bcrypt.compare(req.body.password, user.password);
  if (!valid_password) return res.status(400).send('username or password is incorrect');

  if(!user.activated) return res.status(400).send('Your Email has not been verified. Please verify.');

  // FOR NOW, JUST SEND THE USER ID. HOWEVER, CHANGE THIS TO THE BELOW TO SEND TOKEN
  res.send({user: user.id});

  // TODO: CHANGE THIS BACK TO USING TOKENS
  // // Create a remember me token
  // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  // res.header('auth-token', token).send(token)

});


module.exports = router;