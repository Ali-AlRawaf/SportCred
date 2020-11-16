const express = require('express');
const router = express.Router();
const Option = require('../models/option');

router.get('/getOption/:option', async (req, res) => {

  const option = await Option.findOne({_id: req.params.option}).catch(error => console.log('invalid option id'));
  if (!option) return res.status(400).send('Could not find option');

  res.status(200).send({'option': option});

});

module.exports = router;
