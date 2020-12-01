const mongoose = require('mongoose')

const notifSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    link: { type: mongoose.Schema.Types.ObjectId },
    type: {type: String, required: true},
    notifBody: {type: String, required: true}
})

const inboxSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User' 
    },
    notifs: [{ 
        type: notifSchema, 
        required: true 
    }]
})

module.exports = mongoose.model('Inbox', inboxSchema)