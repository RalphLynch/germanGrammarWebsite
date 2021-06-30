const express = require('express');
const app = express();
const port = 3000;

// Loads the static HTML files for the website
app.use(express.static('website'));

app.listen(port, () => {
    // Listens for anyone connecting to the website
    console.log(`Website listening at http://localhost:${port}`);
})

app.post('/checkAnswers', (req, res) => {
    // Extracts the name of the exercise from the Referer HTTP header
    let exerciseName = req.header('Referer').split("/").pop().slice(0, -5);
})