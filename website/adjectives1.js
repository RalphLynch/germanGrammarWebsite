function loadQuestions() {
    const questions = new Request('http://localhost:3000/adjectives1Questions.json');

    fetch(questions)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.questions.length; i++) {
            document.getElementById(`question${i}`).innerHTML(data.questions[i]);
        }
    })
}