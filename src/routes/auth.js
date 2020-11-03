const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const User = require('../models/user');
const activationToken = require('../models/activationToken');
const resetToken = require('../models/resetToken');
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

  const origToken = crypto.randomBytes(16).toString('hex')
  const hashedToken = await bcrypt.hash(origToken, 10)
  const token = new activationToken({
    _userId: user._id,
    token: hashedToken
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

  await activationToken.findOneAndDelete({_userId: user.id});
  
  const origToken = crypto.randomBytes(16).toString('hex')
  const hashedToken = await bcrypt.hash(origToken, 10)
  var token = new activationToken({
    _userId: user._id, 
    token: hashedToken
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
  const token = await activationToken.findOne({_userId: req.params.id});
  if(!token) return res.status(400).send('This verification link has expired. Please click on resend to verify your Email.');

  const tokenIsValid = await bcrypt.compare(req.params.token, token.token);
  if (!tokenIsValid) return res.status(400).send('This verification link is invalid. Please click on resend to verify your Email.');

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
    await activationToken.findOneAndDelete({_userId: user.id});

    const origToken = crypto.randomBytes(16).toString('hex')
    const hashedToken = await bcrypt.hash(origToken, 10)  
    var token = new activationToken({
      _userId: user._id, 
      token: hashedToken
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

router.post('/forgot-password', async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('This email is not registered');

  await resetToken.findOneAndDelete({_userId: user.id});

  const origToken = crypto.randomBytes(16).toString('hex')
  const hashedToken = await bcrypt.hash(origToken, 10) 
  var token = new resetToken({
    _userId: user._id, 
    token: hashedToken
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
    subject: 'Reset Password', 
    text: 'Hello '+ user.username +',\n\n' + 'Someone (hopefully you) requested to reset your SportCred password. ' + 
          'If you did not request this, please ignore this email, no action is required.\n\nPlease verify your account to allow ' + 
          'password reset by clicking the link: ' + 
          '\nhttp:\/\/localhost:5000\/user\/reset-password\/' + user._id + '\/' + origToken + '\n\nThank You!\n' 
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) return res.status(500).send('Technical Issue!, Please click on resend to verify your Email.');
  });

  return res.status(200).send('Password Reset email has been sent to ' + req.body.email);
})

router.get('/reset-password/:id/:token', async (req, res) => {
  const token = await resetToken.findOne({_userId: req.params.id});
  if(!token) return res.status(400).send('This password reset link has expired. Please resend.');

  const tokenIsValid = await bcrypt.compare(req.params.token, token.token);
  if (!tokenIsValid) return res.status(400).send('This password reset link is invalid. Please resend.');

  return res.status(200).send(
    '<form action="/user/authenticate-reset" method="POST">' +
      '<input type="hidden" name="id" value="' + req.params.id + '" />' +
      '<input type="hidden" name="token" value="' + req.params.token + '" />' +
      '<input type="password" name="password" value="" placeholder="Enter your new password..." />' +
      '<input type="submit" value="Reset Password" />' +
    '</form>'
  );
})

router.post('/authenticate-reset', async (req, res) => {
  const userId = req.body.id;
  const token = req.body.token;
  const password = req.body.password;

  const t = await resetToken.findOne({_userId: userId});
  if(!t) return res.status(400).send('Authentication failed. Please return to the SportCred app and try again.');

  const tokenIsValid = await bcrypt.compare(token, t.token);
  if (!tokenIsValid) return res.status(400).send('Authentication failed. Please return to the SportCred app and try again.');

  const user = await User.findOne({_id: userId})
  if (!user) return res.status(400).send('An error occurred, user not found.');

  const {error} = loginValidation({username: user.username, password: password});
  if (error) return res.status(400).send(error.details[0].message);

  const hashedPass = await bcrypt.hash(password, 10);
  user.password = hashedPass;
  await user.save();

  await resetToken.findOneAndDelete({_userId: userId});
  return res.status(200).send('Successfully updated password, return to app and login with new password!')
})

router.get('/get-user/:id', async (req, res) => {
  const user = await User.findOne({_id: req.params.id});
  if (!user) return res.status(400).send('user query failed');
  return res.status(200).send(user);
})

const verify = require('./verifyToken')
router.post('/editprof', verify, async (req, res) => {

  const { error } = EditProfileValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let UpdateData = _.pick(req.body, ['username', 'email', 'status', 'bio', 'password'])

  // Find the user in the database
  try {

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.password, salt);
      UpdateData.password = hashed_password
    }

    const user = await User.findOne({ _id: user._id });
    if (!user) return res.status(400).send('username or password is incorrect');
    await User.findOneAndUpdate({ _id: user._id }, UpdateData)
    res.send({ action: true });

  } catch (error) {
    console.log(error);
    res.send({ action: false, response: "u have some err in edit profile section check log for more information" });
  }

});



module.exports = router;