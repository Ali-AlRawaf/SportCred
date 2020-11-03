const mongoose = require('mongoose')

const activationTokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '1d' }
});

module.exports = mongoose.model('activationToken', activationTokenSchema)