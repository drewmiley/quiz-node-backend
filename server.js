const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB || 'mongodb://localhost/test');

const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const router = express.Router();
router.use((req, res, next) => {
    console.log('Request made - logging from middleware');
    next();
});

const apiInfo = require('./apiInfo');
router.get('/', (req, res) => {
    res.json(apiInfo);
});

const Quiz = require('./Quiz');
const Leaderboard = require('./Leaderboard');

const util = require('./util');

router.route('/quizcodes')
    .get((req, res) => {
        Quiz.find((err, quizzes) => {
            if (err) {
                res.send(err);
            }
            res.json(quizzes.map(quiz => quiz.code));
        });
    });
router.route('/quizoptions')
    .get((req, res) => {
        res.json(util.validOptions);
    });
router.route('/newquiz')
    .post(async (req, res) => {
        const endpointResponse = await fetch(`https://opentdb.com/api.php?${ util.transformOptions(req.body.options) }`);
        const data = await endpointResponse.json();
        const quiz = util.transformResponseToQuizSchema(data);
        Quiz.create(quiz, err => {
            if (err) {
                res.send(err);
            }
            const leaderboard = { code: quiz.code, results: [] };
            Leaderboard.create(leaderboard, err1 => {
                if (err1) {
                    res.send(err1);
                }
                res.json(util.transformDBQuizToAPIQuiz(quiz));
            });
        });
    });
router.route('/quiz/:code')
    .get((req, res) => {
        Quiz.findOne({ 'code': req.params.code }, (err, quiz) => {
            if (err) {
                res.send(err);
            }
            res.json(util.transformDBQuizToAPIQuiz(quiz));
        });
    });
router.route('/leaderboards')
    .get((req, res) => {
        Leaderboard.find((err, leaderboards) => {
            if (err) {
                res.send(err);
            }
            const responseLeaderboards = req.query.user ?
                leaderboards.filter(leaderboard =>
                    leaderboard.results
                        .map(result => result.user)
                        .includes(req.query.user)
                ) : leaderboards;
            res.json(responseLeaderboards);
        });
    });
router.route('/leaderboard/:code')
    .get((req, res) => {
        Leaderboard.findOne({ 'code': req.params.code }, (err, leaderboard) => {
            if (err) {
                res.send(err);
            }
            res.json(leaderboard);
        });
    });
router.route('/answers/:code/:user')
    .post((req, res) => {
        Quiz.findOne({ 'code': req.params.code }, (err, quiz) => {
            if (err) {
                res.send(err);
            }
            // TODO: debug score
            const score = quiz.questions.filter(d => {
                console.log(req.body.answers)
                const qa = req.body.answers.find(ans => ans.question == d.question);
                console.log(qa);
                return qa && d.answer == qa.answer;
            }).length;
            console.log(score)
            Leaderboard.findOne({ 'code': req.params.code }, (err1, leaderboard) => {
                if (err1) {
                    res.send(err1);
                }
                leaderboard.results.push({ score, user: req.params.user });
                leaderboard.save(err2 => {
                    if (err2) {
                        res.send(err2);
                    }
                    res.json({ code: req.params.code, score, user: req.params.user });
                });
            });
        });
    });
app.use('/api', router);
app.listen(process.env.PORT || 8080);
