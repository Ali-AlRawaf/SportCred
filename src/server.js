const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => console.log('connected to db')
);

// // Middleware
// app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const testAPI = require('./routes/testAPI')
const authRoutes = require('./routes/auth')
const survey = require('./routes/survey')

app.use(cors({origin: '*'}));

app.use('/testAPI', testAPI);
app.use('/user', authRoutes);
app.use('/survey', survey);

app.listen(port, () => console.log(`Listening on port ${port}`));