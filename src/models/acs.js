const mongoose = require('mongoose')

const acsSchema = new mongoose.Schema({
  score: {
    type: Number,
    max: 1100,
    required: true,
    default: 0,
  },

  // TODO: Create sport model and link acs to sport.

})

module.exports = mongoose.model('ACS', acsSchema)
