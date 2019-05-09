# quiz-node-backend

## Installation

1. `npm install`
2. `npm start`

## Endpoints

### GET /quizcodes

Get valid quiz codes

Response is array of strings.

### POST /newquiz(options)

Create + Save a new quiz, can pass a selection of option params.

Response made up of `code`, `quiz`.

### GET /quiz(code)

Get quiz by code

Response made up of `code`, `quiz`.

### GET /leaderboards(user?)

Get leaderboards, optionally by user.

Response made up of `code`, `leaderboard` array.

### GET /leaderboard(code)

Get leaderboard by quiz code.

Response made up of `code`, `leaderboard`.

### POST /answers(code, user)

Post answers to quiz by code and user.

Response made up of `code`, `score`, `user`.
