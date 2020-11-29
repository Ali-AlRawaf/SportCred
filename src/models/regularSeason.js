const mongoose = require('mongoose')

const regularSeasonSchema = new mongoose.Schema({

  topics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic'
  }],

})

module.exports = mongoose.model('RegularSeason', regularSeasonSchema)
