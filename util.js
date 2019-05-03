const generateQuizCode = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getYear() + 1900;
    const random = Math.floor(Math.random() * 10000);
    return `${ day < 10 ? '0' + day : day }${ month < 10 ? '0' + month : month }${ year }${ ('0000' + random).slice(-4) }`;
};

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
