const mongoose = require('mongoose')

const playoffsSchema = new mongoose.Schema({

  topics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic'
  }],

})

module.exports = mongoose.model('Playoffs', playoffsSchema)
