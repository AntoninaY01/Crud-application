const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose').default;

const User = require('./models/user');

const app = express();
// TODO: check the save method
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
})

app.post('/api/user', (req, res, next) => {
    const userList = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        currentPosition: req.body.currentPosition,
        age: req.body.age,
        city: req.body.city,
        address: req.body.address,
        id: req.body.id
    });
    userList.save();
    res.status(201).json({
        message: 'Post added successfully!'
    });
})
app.get("/api/users", (req, res, next) => {
    User.find()
        .then(documents => {
            console.log(documents);
            res.status(200).json({
                message: 'Posts fetched successfully!',
                userList: documents
            })
        });
});

app.delete("/api/users/:id", (req, res, next) => {
    User.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({message: "Post deleted"});
    })
});

app.use((req, res, next) => {
    res.send('hello  from express');
});

module.exports = app;

// use the app as a listener, connect with the server which waits