const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
        <form action="/submit" method="post">
            <input type="text" name="name" placeholder="Enter Name" required />
            <input type="text" name="email" placeholder="Enter Email" required />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/submit', async (req, res) => {
    try {
        const response = await axios.post('http://backend:5000/process', req.body);
        res.send(`Response from backend: ${response.data}`);
    } catch (err) {
        res.status(500).send("Error connecting to backend");
    }
});

app.listen(PORT, () => {
    console.log(`Frontend server running at http://localhost:${PORT}`);
});
