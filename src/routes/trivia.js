const express = require('express');
const router = express.Router();
const triviaSession = require('../models/triviaSession');

//POST A NEW SESSION
router.post('/addSession', async (req, res) => {
    const questions = [
        {
            question: "Who is PG of Brooklyn Nets?",
            answers: [
                { isCorrect: false, optionNumber: 1, answerBody: "Kevin Durant" },
                { isCorrect: true, optionNumber: 2, answerBody: "Kyrie Irving" },
                { isCorrect: false, optionNumber: 3, answerBody: "Jamal Crawford" },
                { isCorrect: false, optionNumber: 4, answerBody: "Caris LeVert" }
            ]
        },
        {
            question: "Who won MVP in the 2020 NBA Playoffs?",
            answers: [
                { isCorrect: true, optionNumber: 1, answerBody: "LeBron James" },
                { isCorrect: false, optionNumber: 2, answerBody: "Anthony Davis" },
                { isCorrect: false, optionNumber: 3, answerBody: "Tyler Herro" },
                { isCorrect: false, optionNumber: 4, answerBody: "Jimmy Butler" }
            ]
        },
        {
            question: "Which team had the highest PPG in the 2019-2020 NBA season?",
            answers: [
                { isCorrect: false, optionNumber: 1, answerBody: "Mavericks" },
                { isCorrect: false, optionNumber: 2, answerBody: "Clippers" },
                { isCorrect: false, optionNumber: 3, answerBody: "Rockets" },
                { isCorrect: true, optionNumber: 4, answerBody: "Bucks" }
            ]
        },
        {
            question: "Which of these players had the highest 3-point percentage in the 2019-2020 NBA season?",
            answers: [
                { isCorrect: false, optionNumber: 1, answerBody: "Paul George" },
                { isCorrect: false, optionNumber: 2, answerBody: "Jayson Tatum" },
                { isCorrect: false, optionNumber: 3, answerBody: "Kyle Korver" },
                { isCorrect: true, optionNumber: 4, answerBody: "JJ Redick" }
            ]
        },
        {
            question: "Who is the only player in NBA history to have scored 100 points in one game?",
            answers: [
                { isCorrect: false, optionNumber: 1, answerBody: "Michael Jordan" },
                { isCorrect: false, optionNumber: 2, answerBody: "Elgin Baylor" },
                { isCorrect: false, optionNumber: 3, answerBody: "Kareem Abdul-Jabbar" },
                { isCorrect: true, optionNumber: 4, answerBody: "Wilt Chamberlain" }
            ]
        },
    ]

    const session = {
        players: req.body.players,
        questions: questions
    }

    try {
        const sesh = new triviaSession(session);
        await sesh.save();
        return res.status(200).send({ id: sesh._id })
    } catch (err) {
        console.log("\n\nERR =\n\n" + err);
        res.status(400).send('error adding trivia');
    }
});

//GET A TRIV SESSION
router.get('/:id', async (req, res) => {
    const foundSession = await triviaSession.findById(req.params.id).catch((err) => {
        return res.status(400).send(err)
    })
    return res.status(200).send({ foundSession: foundSession })
})

//UPDATE SCORE BY 1 POINT
router.post('/add-point', async (req, res) => {
    try {
        const game = await triviaSession.findById(req.body.sid)
        game.players.forEach(p => {
            if (p.userId == req.body.pid) {
                p.totalScore += 1
            }
        })
        await game.save()
        return res.status(200).send("Correct!")
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
})

router.post('/finish-trivia', async (req, res) => {
    try {
        const game = await triviaSession.findById(req.body.sid)
        var currPlayer
        var otherPlayer

        game.players.forEach(p => {
            if (p.userId == req.body.pid) {
                p.done = true
                currPlayer = p
            } else {
                otherPlayer = p
            }
            
        })
        await game.save()
        return res.status(200).send({trivia: game._id, currPlayer: currPlayer, otherPlayer: otherPlayer})
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
})

module.exports = router;