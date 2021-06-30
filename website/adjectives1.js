function loadQuestions(exercise) {
    const questions = new Request(`http://localhost:3000/${exercise}Questions.json`);

    fetch(questions)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.questions.length; i++) {
            document.getElementById(`question${i + 1}`).innerHTML = data.questions[i];
        }
    })
}