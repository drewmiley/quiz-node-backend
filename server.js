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
        // const endpointResponse = await fetch('https://opentdb.com/api.php?amount=10');
        // const data = await endpointResponse.json();
        const data = {
            "response_code":0,
            "results":[
                {
                    "category":"History",
                    "type":"boolean",
                    "difficulty":"hard",
                    "question":"Japan was part of the Allied Powers during World War I.",
                    "correct_answer":"True",
                    "incorrect_answers":["False"]
                },
                {
                    "category":"History",
                    "type":"multiple",
                    "difficulty":"easy",
                    "question":"In which year did the Invasion of Kuwait by Iraq occur?",
                    "correct_answer":"1990",
                    "incorrect_answers":["1992","1988","1986"]
                },
                {"category":"General Knowledge","type":"multiple","difficulty":"medium","question":"What is the name of the popular animatronic singing fish prop, singing such hits such as &quot;Don&#039;t Worry, Be Happy&quot;?","correct_answer":"Big Mouth Billy Bass","incorrect_answers":["Big Billy Bass","Singing Fish","Sardeen"]},
                {"category":"Entertainment: Video Games","type":"boolean","difficulty":"easy","question":"Danganronpa 2: Goodbye Despair featured all of the surviving students from the first game.","correct_answer":"True","incorrect_answers":["False"]},
                {"category":"Science & Nature","type":"multiple","difficulty":"hard","question":"The core of the Sun can reach which temperature?","correct_answer":"27&deg; Million F (15&deg; Million C)","incorrect_answers":["938,000&deg; F (521093.3&deg; C)","8&deg; Billion F (&deg;4.4 Billion C)","Absolute Zero (Both F and C)"]},
                {"category":"Science & Nature","type":"multiple","difficulty":"easy","question":"What does LASER stand for?","correct_answer":"Light amplifiaction by stimulated eminission of radioation","incorrect_answers":["Lite analysing by stereo ecorazer","Light ampiflier by standby energy of radio","Life antimatter by standing entry of range"]},
                {"category":"Entertainment: Video Games","type":"boolean","difficulty":"hard","question":"All of these maps were in &quot;Tom Clancy&#039;s Rainbow Six Siege&quot; on its initial release: House, Clubhouse, Border, Consulate.","correct_answer":"False","incorrect_answers":["True"]},
                {"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"hard","question":"Medaka Kurokami from &quot;Medaka Box&quot; has what abnormality?","correct_answer":"The End","incorrect_answers":["Perfection","Sandbox","Fairness"]},
                {"category":"General Knowledge","type":"multiple","difficulty":"hard","question":"What was Bank of America originally established as?","correct_answer":"Bank of Italy","incorrect_answers":["Bank of Long Island","Bank of Pennsylvania","Bank of Charlotte"]},
                {"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"hard","question":"Which person from &quot;JoJo&#039;s Bizarre Adventure&quot; does NOT house a reference to a band, artist, or song earlier than 1980?","correct_answer":"Giorno Giovanna","incorrect_answers":["Josuke Higashikata","Jolyne Cujoh","Johnny Joestar"]}
            ]
        };
        console.log(req.body.options);
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
        const data = {
            "response_code":0,
            "results":[
                {
                    "category":"History",
                    "type":"boolean",
                    "difficulty":"hard",
                    "question":"Japan was part of the Allied Powers during World War I.",
                    "correct_answer":"True",
                    "incorrect_answers":["False"]
                },
                {
                    "category":"History",
                    "type":"multiple",
                    "difficulty":"easy",
                    "question":"In which year did the Invasion of Kuwait by Iraq occur?",
                    "correct_answer":"1990",
                    "incorrect_answers":["1992","1988","1986"]
                },
                {"category":"General Knowledge","type":"multiple","difficulty":"medium","question":"What is the name of the popular animatronic singing fish prop, singing such hits such as &quot;Don&#039;t Worry, Be Happy&quot;?","correct_answer":"Big Mouth Billy Bass","incorrect_answers":["Big Billy Bass","Singing Fish","Sardeen"]},
                {"category":"Entertainment: Video Games","type":"boolean","difficulty":"easy","question":"Danganronpa 2: Goodbye Despair featured all of the surviving students from the first game.","correct_answer":"True","incorrect_answers":["False"]},
                {"category":"Science & Nature","type":"multiple","difficulty":"hard","question":"The core of the Sun can reach which temperature?","correct_answer":"27&deg; Million F (15&deg; Million C)","incorrect_answers":["938,000&deg; F (521093.3&deg; C)","8&deg; Billion F (&deg;4.4 Billion C)","Absolute Zero (Both F and C)"]},
                {"category":"Science & Nature","type":"multiple","difficulty":"easy","question":"What does LASER stand for?","correct_answer":"Light amplifiaction by stimulated eminission of radioation","incorrect_answers":["Lite analysing by stereo ecorazer","Light ampiflier by standby energy of radio","Life antimatter by standing entry of range"]},
                {"category":"Entertainment: Video Games","type":"boolean","difficulty":"hard","question":"All of these maps were in &quot;Tom Clancy&#039;s Rainbow Six Siege&quot; on its initial release: House, Clubhouse, Border, Consulate.","correct_answer":"False","incorrect_answers":["True"]},
                {"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"hard","question":"Medaka Kurokami from &quot;Medaka Box&quot; has what abnormality?","correct_answer":"The End","incorrect_answers":["Perfection","Sandbox","Fairness"]},
                {"category":"General Knowledge","type":"multiple","difficulty":"hard","question":"What was Bank of America originally established as?","correct_answer":"Bank of Italy","incorrect_answers":["Bank of Long Island","Bank of Pennsylvania","Bank of Charlotte"]},
                {"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"hard","question":"Which person from &quot;JoJo&#039;s Bizarre Adventure&quot; does NOT house a reference to a band, artist, or song earlier than 1980?","correct_answer":"Giorno Giovanna","incorrect_answers":["Josuke Higashikata","Jolyne Cujoh","Johnny Joestar"]}
            ]
        };
        const retrievedQuiz = util.transformResponseToQuizSchema(data);
        console.log(req.params.code);
        res.json(util.transformDBQuizToAPIQuiz(retrievedQuiz));
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
// router.route('/users')
//     .post((req, res) => {
//         let user = new User();
//         user.name = req.body.name;
//         user.save(err => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json({ message: 'User created!' });
//         });
//     })
//     .get((req, res) => {
//         User.find((err, users) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json(users);
//         });
//     });
// router.route('/users/:id')
//     .get((req, res) => {
//         User.findById(req.params.id, (err, user) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json(user);
//         });
//     })
//     .put((req, res) => {
//         User.findById(req.params.id, (err, user) => {
//             if (err) {
//                 res.send(err);
//             }
//             user.name = req.body.name;
//             user.save(err => {
//                 if (err) {
//                     res.send(err);
//                 }
//                 res.json({ message: 'User updated!' });
//             });
//
//         });
//     })
//     .delete((req, res) => {
//         User.remove({
//             _id: req.params.id
//         }, (err, user) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json({ message: 'User deleted' });
//         });
//     });
// router.route('/randomusers')
//     .get(async (req, res) => {
//         const endpointResponse = await fetch('https://jsonplaceholder.typicode.com/users');
//         const data = await endpointResponse.json();
//         const users = data.map(user => user.name);
//         res.json(users);
//     });
app.use('/api', router);
app.listen(8080);
