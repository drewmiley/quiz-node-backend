const whitelist = [
    'http://localhost:8081',
    'https://quiz-react-frontend.herokuapp.com/'
];

module.exports = {
    origin: (origin, callback) => whitelist.includes(origin) ?
        callback(null, true)  :
        callback(new Error('Not allowed by CORS'))
}
