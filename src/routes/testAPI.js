const express = require('express');
const router = express.Router();
const verify = require('./verifyToken')

// Test for authentication middleware
router.get('/', verify, (req, res, next) => {
    res.send(req.user);
    // User.findbyOne({_id: req.user})
});

router.get('/json', (req, res, next) => {
    res.send({express: 'This is a JSON response'});
});

//request body must follow: {req: "myData"}
router.get('/condition', (req, res, next) => {
    if(req.body.req == 'first')
      res.send('First response');
    else
      res.send('Other response');
});

module.exports = router;