module.exports = [
    {
        name: 'Valid Quiz Codes',
        route: '/quizcodes',
        params: null,
        query: null,
        body: null
    },
    {
        name: 'Valid Quiz Options',
        route: '/quizoptions',
        params: null,
        query: null,
        body: null
    },
    {
        name: 'Generate Quiz',
        route: '/newquiz',
        params: null,
        query: null,
        body: ['options']
    },
    {
        name: 'Load Quiz',
        route: '/quiz',
        params: ['code'],
        query: null,
        body: null
    },
    {
        name: 'Get Leaderboards',
        route: '/leaderboards',
        params: null,
        query: ['user'],
        body: null
    },
    {
        name: 'Get Leaderboard',
        route: '/leaderboard',
        params: ['code'],
        query: null,
        body: null
    },
    {
        name: 'Submit Answers',
        route: '/answers',
        params: ['code', 'user'],
        query: null,
        body: ['answers']
    }
]
