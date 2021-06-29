const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('website'));

app.listen(port, () => {
    console.log(`Website listening at http://localhost:${port}`);
})