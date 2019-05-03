const generateQuizCode = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getYear() + 1900;
    const random = Math.floor(Math.random() * 10000);
    return `${ day < 10 ? '0' + day : day }${ month < 10 ? '0' + month : month }${ year }${ ('0000' + random).slice(-4) }`;
};

module.exports.transformOptions = options => {
    let queryString = '';
    if (options.amount) {
        queryString += `amount=${ options.amount }`;
    } else {
        queryString += 'amount=10';
    }
    if (options.category) {
        // TODO: Implement
        // <select name="trivia_category" class="form-control">
		// 	<option value="any">Any Category</option>
		// 	<option value="9">General Knowledge</option><option value="10">Entertainment: Books</option><option value="11">Entertainment: Film</option><option value="12">Entertainment: Music</option><option value="13">Entertainment: Musicals &amp; Theatres</option><option value="14">Entertainment: Television</option><option value="15">Entertainment: Video Games</option><option value="16">Entertainment: Board Games</option><option value="17">Science &amp; Nature</option><option value="18">Science: Computers</option><option value="19">Science: Mathematics</option><option value="20">Mythology</option><option value="21">Sports</option><option value="22">Geography</option><option value="23">History</option><option value="24">Politics</option><option value="25">Art</option><option value="26">Celebrities</option><option value="27">Animals</option><option value="28">Vehicles</option><option value="29">Entertainment: Comics</option><option value="30">Science: Gadgets</option><option value="31">Entertainment: Japanese Anime &amp; Manga</option><option value="32">Entertainment: Cartoon &amp; Animations</option>		</select>
    }
    if (options.difficulty && ['easy', 'medium', 'hard'].includes(options.difficulty)) {
        queryString += `difficulty=${ options.difficulty }`;
    }
    if (options.type && ['multiple', 'boolean'].includes(options.type)) {
        queryString += `type=${ options.type }`;
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
