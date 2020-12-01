const mongoose = require('mongoose')

const preseasonSchema = new mongoose.Schema({

  topics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic'
  }],

})

module.exports = mongoose.model('Preseason', preseasonSchema)
