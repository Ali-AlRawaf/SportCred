const express = require('express');
const router = express.Router();
const Debate = require('../models/debate');
const Option = require('../models/option');
const Vote = require('../models/vote');
const User = require('../models/user');

router.post('/addDebate', async (req, res) => {

  const winner = await User.findOne({_id: req.body.winner}).catch(error => console.log('invalid winner id'));
  if (!winner) return res.status(400).send('Could not find winner');

  for (const option in req.body.options) {
    const opt = await Option.findOne({_id: req.body.options[option]}).catch(error => console.log('invalid option id'));
    if (!opt) return res.status(400).send('Could not find option');
  }

  for (const user in req.body.users) {
    const usr = await User.findOne({_id: req.body.users[user]}).catch(error => console.log('invalid user id'));
    if (!usr) return res.status(400).send('Could not find user');
  }

  for (const vote in req.body.votes) {
    const v = await Votes.findOne({_id: req.body.votes[vote]}).catch(error => console.log('invalid vote id'));
    if (!v) return res.status(400).send('Could not find vote');
  }

  var newDebate = new Debate({
    topic: req.body.topic,
    options: req.body.options,
    users: req.body.users,
    votes: req.body.votes,
    winner: req.body.winner,
  });

  try {
    await newDebate.save();
    res.status(200).send('debate added');
  } catch (err) {
    console.log(err);
    res.status(400).send('error adding debate');
  }
});

router.post('/addOption', async (req, res) => {

  const debate = await Debate.findOne({_id: req.body.debate}).catch(error => console.log('invalid debate id'));
  if (!debate) return res.status(400).send('Could not find debate');

  var newOption = new Option({
    debateId: req.body.debate,
    option: req.body.option,
  });

  try {
    await newOption.save();
    debate.options.push(newOption._id);
    await debate.save();
    res.status(200).send('option added');
  } catch (err) {
    console.log(err);
    res.status(400).send('error adding option');
  }

});

router.post('/addVote', async (req, res) => {

  const opt = await Option.findOne({_id: req.body.option}).catch(error => console.log('invalid option id'));
  if (!opt) return res.status(400).send('Could not find option');

  const debate = await Debate.findOne({_id: opt.debateId}).catch(error => console.log('invalid debate id'));
  if (!debate) return res.status(400).send('Could not find debate');

  const user = await User.findOne({_id: req.body.user}).catch(error => console.log('invalid user id'));
  if (!user) return res.status(400).send('Could not find user');

  var newVote = new Vote({
    debateId: opt.debateId,
    optionId: req.body.option,
    userId: req.body.user,
    value: req.body.value
  });

  try {
    await newVote.save();
    debate.votes.push(newVote._id);
    await debate.save();
    res.status(200).send('Vote added');
  } catch (err) {
    console.log(err);
    res.status(400).send('error adding Vote');
  }
});

router.get('/getAllOptions/:debate', async (req, res) => {

  const debate = await Debate.findOne({_id: req.params.debate}).catch(error => console.log('invalid debate id'));
  if (!debate) return res.status(400).send('Could not find debate');

  res.status(200).send({'options': debate.options});
});

router.get('/getDebate/:debate', async (req, res) => {

  const debate = await Debate.findOne({_id: req.params.debate}).catch(error => console.log('invalid debate id'));
  if (!debate) return res.status(400).send('Could not find debate');

  res.status(200).send({'debate': debate});
});

router.get('/optionVotes/:debate/:option', async (req, res) => {

  const debate = await Debate.findOne({_id: req.params.debate}).catch(error => console.log('invalid debate id'));
  if (!debate) return res.status(400).send('Could not find debate');

  let optionVotes = [];
  for (const vIndex in debate.votes) {
    const v = await Vote.findOne({_id: debate.votes[vIndex]}).catch(error => console.log('invalid vote id'));
    if (v.optionId == req.params.option) {
      optionVotes.push(v);
    }
  }
  res.status(200).send({'votes': optionVotes});
});

module.exports = router;
