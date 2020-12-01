const express = require('express');
const router = express.Router();
const triviaSession = require('../models/triviaSession');

//POST A NEW SESSION
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

//GET A TRIV SESSION
router.get('/:id', async (req, res) => {
    const foundSession = await triviaSession.findById(req.params.id)
        .exec()
        .catch((err) => {
            return res.status(400).send(err)
        })
    return res.status(200).send({ foundSession: foundSession })
})

//UPDATE SCORE BY 1 POINT
router.post('/:sid/:pid', async (req, res) => {
    try {
        const game = await triviaSession.findById(req.params.sid)
        console.log("this is in the list " + game.players[0].userId)
        console.log("this is from params " + req.params.pid)
        game.players.forEach(p => {
            if (p.userId == req.params.pid) {
                p.totalScore += 1
            }
        })
        await game.save()
        res.status(200).send({ _id: req.params.sid })
    } catch (err) {
        console.log(err)
        res.status(400).send("error adding point");
    }
})

module.exports = router;