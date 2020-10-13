var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('This is a string response');
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