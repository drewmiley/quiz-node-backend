const generateQuizCode = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getYear() + 1900;
    const random = Math.floor(Math.random() * 10000);
    return `${ day < 10 ? '0' + day : day }${ month < 10 ? '0' + month : month }${ year }${ ('0000' + random).slice(-4) }`;
};

const categoryMap = {
    'General Knowledge': 9,
    'Books': 10,
    'Film': 11,
    'Music': 12,
    'Musicals and Theatres': 13,
    'Television': 14,
    'Video Games': 15,
    'Board Games': 16,
    'Science and Nature': 17,
    'Computers': 18,
    'Mathematics': 19,
    'Mythology': 20,
    'Sports': 21,
    'Geography': 22,
    'History': 23,
    'Politics': 24,
    'Art': 25,
    'Celebrities': 26,
    'Animals': 27,
    'Vehicles': 28,
    'Comics': 29,
    'Gadgets': 30,
    'Cartoon and Animations': 32
};

const validOptions = {
    amount: 'integer',
    category: Object.keys(categoryMap),
    difficulty: ['any', 'easy', 'medium', 'hard'],
    type: ['any', 'multiple', 'boolean']
}

module.exports.validOptions = validOptions;

module.exports.transformOptions = options => {
    let queryString = '';
    if (options.amount && parseInt(options.amount, 10)) {
        queryString += `amount=${ options.amount }`;
    } else {
        queryString += 'amount=10';
    }
    if (options.category && validOptions.category.includes(options.category)) {
        queryString += `&category=${ categoryMap[options.category] }`;
    }
    if (options.difficulty && validOptions.difficulty.filter(d => d != 'any').includes(options.difficulty)) {
        queryString += `&difficulty=${ options.difficulty }`;
    }
    if (options.type && validOptions.type.filter(d => d != 'any').includes(options.type)) {
        queryString += `&type=${ options.type }`;
    }
    return queryString;
}

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
