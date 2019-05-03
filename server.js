const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const fetch = require('node-fetch');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const router = express.Router();
router.use((req, res, next) => {
    console.log('Request made - logging from middleware');
    next();
});
router.get('/', (req, res) => {
    res.json({ message: 'Server running' });
});

const Quiz = require('./Quiz');
const Leaderboard = require('./Leaderboard');

const util = require('./util');

router.route('/newquiz')
    .post(async (req, res) => {
        const endpointResponse = await fetch(`https://opentdb.com/api.php?${ util.transformOptions(req.body.options) }`);
        const data = await endpointResponse.json();
        const quiz = util.transformResponseToQuizSchema(data);
        Quiz.create(quiz, err => {
            if (err) {
                res.send(err);
            }
            res.json(util.transformDBQuizToAPIQuiz(quiz));
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
        console.log(req.query.user);
        res.json([{ code: '', leaderboard: {} }]);
    });
router.route('/leaderboards/:code')
    .get((req, res) => {
        console.log(req.params.code);
        res.json({ code: '', leaderboard: {} });
    });
router.route('/answers/:code/:user')
    .post((req, res) => {
        console.log(req.params.code);
        console.log(req.params.user);
        console.log(req.body.answers);
        res.json({ code: '', score: 0, user: '' });
    });
app.use('/api', router);
app.listen(8080);
