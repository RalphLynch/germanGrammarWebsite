const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// Loads the static HTML files for the website
app.use(express.static('website'));

app.use(express.urlencoded());

app.listen(port, () => {
    // Listens for anyone connecting to the website
    console.log(`Website listening at http://localhost:${port}`);
})

app.post('/checkAnswers', (req, res) => {
    // Extracts the name of the exercise from the Referer HTTP header
    let exerciseName = req.header('Referer').split("/").pop().slice(0, -5);

    // Reads the solutions to the questions from a JSON file
    let solutionsObject = JSON.parse(fs.readFileSync(__dirname + `/solutions/${exerciseName}Solutions.json`));

    // Checks the answers and adds up the score
    var score = 0;
    var i = 0
    for (let key in req.body) {
        if (req.body[key] === solutionsObject.solutions[i]) {
            score++;
        }
        i++
    }
})