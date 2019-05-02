// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// const Schema = mongoose.Schema;
// const UserSchema = new Schema({
//     name: String
// });
// const User = mongoose.model('User', UserSchema);
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
router.route('/newquiz')
    .post((req, res) => {
        console.log(req.body.options);
        res.json({ code: '', quiz: [] });
    });
router.route('/quiz/:code')
    .get(async (req, res) => {
        const endpointResponse = await fetch('https://opentdb.com/api.php?amount=10');
        const data = await endpointResponse.json();
        console.log(req.params.code);
        res.json({ code: '', quiz: [data] });
    });
router.route('/leaderboards/:user*?')
    .get((req, res) => {
        console.log(req.params.user);
        res.json([{ code: '', leaderboard: {} }]);
    });
router.route('/leaderboards/:code')
    .get((req, res) => {
        console.log(req.params.code);
        res.json({ code: '', leaderboard: {} });
    });
router.route('/answers/:code/:user')
    .get((req, res) => {
        console.log(req.params.code);
        console.log(req.params.user);
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
