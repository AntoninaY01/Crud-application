const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/user', (req, res, next) => {
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
router.get("/users", (req, res, next) => {
    User.find()
        .then(documents => {
            console.log(documents);
            res.status(200).json({
                message: 'Posts fetched successfully!',
                userList: documents
            })
        });
});

router.put("/user/:id", (req, res, next) => {
    const userId = req.params.id;
    const updatedUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        currentPosition: req.body.currentPosition,
        age: req.body.age,
        city: req.body.city,
        address: req.body.address,
    };

    User.updateOne({ _id: userId }, { $set: updatedUserData })
        .then(result => {
            if (result.modifiedCount > 0) {
                res.status(200).json({ message: "Updated user", user: updatedUserData });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(error => {
            console.error('Error updating user:', error);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

router.delete("/user/:id", (req, res, next) => {
    User.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({message: "Post deleted"});
    })
});

module.exports = router;
