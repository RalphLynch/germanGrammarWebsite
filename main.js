const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

// Opens the database
var db = new sqlite3.Database('./websiteDatabase');

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

app.post('/createAccount', (req, res) => {
    // Checks if the username submitted is already in the database
    let username = db.get("SELECT Username FROM tblUser WHERE Username = ?", req.body[0]);
    // If the username hasn't already been taken, create an account 
    if (username == undefined) {
        db.run("INSERT INTO tblUser (Username, Password) VALUES (?, ?);", req.body[0], req.body[1]);
        res.send("Account created. <a href=\"index.html\">Home</a>");
    } else {
        // Otherwise send an error message and don't create an account
        res.send("Username already taken. <a href=\"login.html\">Create account</a>");
    }
})

app.post('/login', (req, res) => {
    // Password for the account with the given username
    let password = db.get("SELECT Username FROM tblUser WHERE Username = ?", req.body[0]);
    // Checks if the password supplied by the user matches the password in the database
    if (req.body[1] == password) {
        // If it matches, send a success message
        res.send("You are now logged in. <a href=\"index.html\"Home</a>");
    } else {
        // Otherwise ask the user to try again
        res.send("Username or password incorrect. <a href=\"login.html\">Try again</a>")
    }
})
