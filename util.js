const generateQuizCode = () => 1;

module.exports.transformResponseToQuizSchema = response => {
    const code = generateQuizCode();
    const questions = response.results.map(d => {
        return {
            category: d.category,
            questionType: d.type,
            difficulty: d.difficulty,
            question: d.question,
            answer: d.correct_answer,
            incorrectAnswers: d.incorrect_answers
        };
    });
    return { code, questions };
};

module.exports.transformDBQuizToAPIQuiz = retrievedQuiz => {
    const code = retrievedQuiz.code;
    const quiz = retrievedQuiz.questions.map(d => {
        return {
            question: d.question,
            answer: d.answer,
            incorrectAnswers: d.incorrectAnswers
        }
    });
    return { code, quiz };
}
