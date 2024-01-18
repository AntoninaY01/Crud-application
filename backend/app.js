const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose').default;
const usersRoutes = require("./routes/users");
const eventsRoutes = require("./routes/events")


const app = express();
mongoose.connect("mongodb://localhost:27017/users").then(
    () => {
        console.log('conneceted to database')
    })
    .catch((err) => {
        console.log('connection failed', err);
    })

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
})

app.use('/api', usersRoutes);
app.use('/api', eventsRoutes)

module.exports = app;

// use the app as a listener, connect with the server which waits