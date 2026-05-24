const express = require('express');
const app = express();

app.use(express.json());

app.post('/data', (req, res) => {
    const data =req.body;
    console.log('Received data:', data);
    res.json({ message: 'Data received', data });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/about', (req, res) => {
    res.send('This is the about page');
});


module.exports = app