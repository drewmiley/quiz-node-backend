const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    code: String,
    questions: [{
        category: String,
        questionType: String,
        difficulty: String,
        question: String,
        answer: String,
        incorrectAnswers: [String]
    }]
});
const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
