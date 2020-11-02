const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    expiry: { type: Date, required: true}
});

module.exports = mongoose.model('Token', tokenSchema)