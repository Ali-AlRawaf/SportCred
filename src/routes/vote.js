const express = require('express');
const router = express.Router();
const Vote = require('../models/vote');
const Option = require('../models/option');


router.get('/getVote/:vote', async (req, res) => {

  const vote = await Vote.findOne({_id: req.params.vote}).catch(error => console.log('invalid vote id'));
  if (!vote) return res.status(400).send('Could not find vote');

  res.status(200).send({'vote': vote});

});


module.exports = router;
