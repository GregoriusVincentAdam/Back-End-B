const express = require('express');
const datamember = require("./members.js");
const datauser = require("./users.js");
const moment = require("moment");

const app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('This is the home page (Adam, Gregorius Vincent)');
});

app.get('/about', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send({
        status: "success",
        message: "response success",
        description: "Exercise #03",
        date:moment().format(),
        data: datamember,
    });
});

app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'text/json');
    res.send(datauser);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
