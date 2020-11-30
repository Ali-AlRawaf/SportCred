const express = require('express');
const router = express.Router();
const triviaSession = require('../models/triviaSession');

router.post('/addSession', async (req, res) => {
    const session = {
        players: req.body.players,
        questions: req.body.questions
    }
    console.log(session)

    try {
        const sesh = new triviaSession(session);
        await sesh.save();
        return res.status(200).send({ id: session._id })
    } catch (err) {
        console.log(err);
        res.status(400).send('error adding trivia');
    }
});

router.get('/:id', async (req, res) => {
    const foundSession = await triviaSession.findById(req.params.id)
        .exec()
        .catch((err) => {
            return res.status(400).send(err)
        })
    return res.status(200).send({ foundSession: foundSession })
})

module.exports = router;