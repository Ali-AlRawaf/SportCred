const mongoose = require('mongoose')

const pickTopicSchema = new mongoose.Schema({

  topic: {
  	type: String,
  },

})

module.exports = mongoose.model('PickTopic', pickTopicSchema)
