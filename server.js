const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 5000;

var testAPI = require('./routes/testAPI')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/testAPI', testAPI);

app.listen(port, () => console.log(`Listening on port ${port}`));