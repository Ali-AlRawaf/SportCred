const express = require('express');
const router = express.Router();
const Radar = require('../models/radar')
const User = require('../models/user')

router.post('/addFollower', async (req, res) => {

  const user = await User.findOne({_id: req.body.user}).catch(error => console.log('invalid user id'));
  if (!user) return res.status(400).send('Could not find user');

  const follower = await User.findOne({_id: req.body.follower}).catch(error => console.log('invalid user id'));
  if (!user) return res.status(400).send('Could not find user');

  var radarList = await Radar.findOne({user: req.body.user}).catch(error => console.log('invalid user id'));
  if (!radarList) {
    radarList = new Radar({
      user: user._id,
      followers: []
    })
  }

  for (const fol in radarList.followers) {
    if (follower._id.toString() == radarList.followers[fol].toString()) {
      return res.status(400).send('already following');
    }
  }

  try {
    radarList.followers.push(follower._id);
    await radarList.save();
    res.status(200).send('Follower added');
  } catch (err) {
    res.status(400).send('error adding follower');
  }
});


module.exports = router;
