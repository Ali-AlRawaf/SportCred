const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const User = require('../models/user');
const Token = require('../models/token');
const {registrationValidation, loginValidation} = require('../validations/user_validations');
const token = require('../models/token');

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

  const origToken = crypto.randomBytes(16).toString('hex')
  const hashedToken = await bcrypt.hash(origToken, 10)
  const token = new Token({
    _userId: user._id,
    token: hashedToken,
    expiry: Date.now() + 86400000
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
    text: 'Hello '+ user.username +',\n\n' + 'This link will expire 24 hours from now, please verify your account by clicking the link: ' + 
          '\nhttp:\/\/localhost:5000\/user\/confirm\/' + user._id + '\/' + origToken + '\n\nThank You!\n' 
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) return res.status(500).send('Technical Issue!, Please click on resend to verify your Email.');

    return res.status(200).send({ user: user._id });
  });
});

router.post('/resend-activation', async (req, res) => {
  const user = await User.findOne({_id: req.body.userId});
  if (!user) return res.status(400).send('User not found');

  if (user.activated) return res.status(200).send('Your account has already been activated, please continue.');

  await Token.findOneAndDelete({_userId: user.id});
  
  const origToken = crypto.randomBytes(16).toString('hex')
  const hashedToken = await bcrypt.hash(origToken, 10)
  var token = new Token({
    _userId: user._id, 
    token: hashedToken,
    expiry: Date.now() + 86400000
  });

  try{
    await token.save();
  }catch(err){
    return res.status(400).send(err);
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
    text: 'Hello '+ user.username +',\n\n' + 'This link will expire 24 hours from now, please verify your account by clicking the link: ' + 
          '\nhttp:\/\/localhost:5000\/user\/confirm\/' + user._id + '\/' + origToken + '\n\nThank You!\n' 
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) return res.status(500).send('Technical Issue!, Please click on resend to verify your Email.');
  });

  return res.status(200).send('Activation email sent!');
});

router.get('/confirm/:id/:token', async (req, res) => {
  const token = await Token.findOne({_userId: req.params.id});
  if(!token) return res.status(400).send('This verification link is invalid. Please click on resend to verify your Email.');

  const tokenIsValid = await bcrypt.compare(req.params.token, token.token);
  if (!tokenIsValid) return res.status(400).send('Invalid token.');

  const user = await User.findOneAndUpdate({_id: token._userId}, {activated: true})
  if (!user) return res.status(400).send('An error occurred, user not found.');

  if(user.activated) return res.status(200).send('Account is already activated. Please login!');

  return res.status(200).send('Your account has been successfully verified');
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

  if(!user.activated){ //return res.status(400).send('Your Email has not been verified. Please verify.');
    await Token.findOneAndDelete({_userId: user.id});

    const origToken = crypto.randomBytes(16).toString('hex')
    const hashedToken = await bcrypt.hash(origToken, 10)  
    var token = new Token({
      _userId: user._id, 
      token: hashedToken,
      expiry: Date.now() + 86400000
    });

    try{
      await token.save();
    }catch(err){
      return res.status(400).send(err);
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
      text: 'Hello '+ user.username +',\n\n' + 'This link will expire 24 hours from now, please verify your account by clicking the link: ' + 
            '\nhttp:\/\/localhost:5000\/user\/confirm\/' + user._id + '\/' + origToken + '\n\nThank You!\n'
    };

    transporter.sendMail(mailOptions, function (err) {
      if (err) return res.status(500).send('Technical Issue!, Please click on resend to verify your Email.');
    });

    return res.status(201).send({user: user.id});
  }

  // FOR NOW, JUST SEND THE USER ID. HOWEVER, CHANGE THIS TO THE BELOW TO SEND TOKEN
  return res.status(200).send({user: user.id});

  // TODO: CHANGE THIS BACK TO USING TOKENS
  // // Create a remember me token
  // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  // res.header('auth-token', token).send(token)

});

router.get('/get-user/:id', async (req, res) => {
  const user = await User.findOne({_id: req.params.id});
  if (!user) return res.status(400).send('user query failed');
  return res.status(200).send(user);
})


module.exports = router;