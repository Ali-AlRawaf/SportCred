const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/searchName', async (req, res) => {
    const users = await User.find({username: new RegExp(req.body.username, "gi")});
    if (!users.length) return res.status(404).send('User does not exist');
    try{
      res.send(users.map(function(user) {return {"username": user.username, "email": user.email}} ));
    }catch(err){
      res.status(400).send(err);
    }
});

module.exports = router;