var selectedQuestions;

function loadQuestions(exercise) {
    // Generates the URL for the file containing the questions
    const questions = new Request(`http://localhost:3000/${exercise}Questions.json`);

    // Stores questions that have been selected to be displayed
    selectedQuestions = new Array(0);

    // Fetches the question file
    fetch(questions)
    // Converts response to JSON
    .then(response => response.json())
    .then(data => {
        // Inserts each question into an ordered list
        for (let i = 0; i < 5; i++) {
            // Selects a random index of a question
            let questionIndex = Math.floor(Math.random() * 5);

            // If the index has already been selected, a new index is chosen until it is a new index
            while (selectedQuestions.includes(questionIndex)) {
                questionIndex = Math.floor(Math.random() * 5);
            }

            // Inserts the question into an ordered list
            document.getElementById(`question${i + 1}`).innerHTML = data.questions[questionIndex];

            // Adds the index of the selected question to an array.
            selectedQuestions.push(questionIndex);
        }
    })
}

async function checkAnswers(exercise) {
    let score = 0;
    let quiz = document.getElementById("quiz").elements;
    const solutions = new Request(`http://localhost:3000/${exercise}Solutions.json`);
    await fetch(solutions)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < 5; i++) {
            //console.log(quiz[i].value);
            //console.log(data.solutions[selectedQuestions[i]]);
            
            if (data.solutions[selectedQuestions[i]] == quiz[i].value) {
                score++;
            }
            console.log(`loop ${i}: ${score}`);
        }
    })
    console.log("final: " + score);
    document.getElementById("score").innerHTML = score;
}