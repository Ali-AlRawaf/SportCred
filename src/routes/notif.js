const express = require('express');
const router = express.Router();
const Inbox = require('../models/inbox')
const User = require('../models/user')

router.post('/send-notif', async (req, res) => {
    try{
        const user = await User.findOne({_id: req.body.recipient})
        if (!user) return res.status(400).send('The user you are notifying does not exist');
        console.log(user);
        
        const inbox = await Inbox.findOne({user: req.body.recipient})
        console.log(inbox);
        if(!inbox){
            const i = new Inbox({
                user: req.body.recipient,
                notifs: [{
                    sender: req.body.sender,
                    link: req.body.link,
                    notifBody: req.body.notifBody
                }]
            })
            await i.save()
        } else {
            inbox.notifs.push({
                sender: req.body.sender,
                link: req.body.link,
                notifBody: req.body.notifBody
            })
            await inbox.save()
        }
        
        return res.status(200).send("Success!");
    }catch(err){
        return res.status(500).send(err);
    }
})

router.get('/get-notifs/:id', async (req, res) => {
    const inbox = await Inbox.findOne({user: req.params.id});

    if(inbox){
        return res.status(200).send({notifs: inbox.notifs})
    } else {
        return res.status(200).send({notifs: []})
    }
})


module.exports = router;