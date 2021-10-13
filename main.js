const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const cookie-parser = require('cookie-parser');
const app = express();
const port = 3000;

// Loads the static HTML files for the website
app.use(express.static('website'));

// Converts POST request bodies to JSON
app.use(express.urlencoded());

// Parses cookies
app.use(cookieParser());

app.listen(port, () => {
    // Listens for anyone connecting to the website
    console.log(`Website listening at http://localhost:${port}`);
})

app.post('/checkAnswers', (req, res) => {
    // Extracts the name of the exercise from the Referer HTTP header
    let exerciseName = req.header('Referer')

    // Reads the solutions to the questions from a JSON file
    let solutionsObject = JSON.parse(fs.readFileSync(__dirname + `/solutions/${exerciseName}Solutions.json`));

    // Checks the answers and adds up the score
    var score = 0;
    var i = 0;
    for (let key in req.body) {
        if (req.body[key] === solutionsObject.solutions[i]) {
            score++;
        }
        i++;
    }

    // Sends the score to the website
    res.send(`<a href="index.html">Home</a><br>Score: ${score}`);
})