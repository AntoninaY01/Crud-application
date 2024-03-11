const express = require('express');

const Event = require('../models/event');

const router = express.Router();

router.post('/event', (req, res, next) => {
    const event = new Event({
        eventType: req.body.eventType,
        eventName: req.body.eventName,
        guestsAmount: req.body.guestsAmount,
        date: req.body.date,
        address: req.body.address,
        dresscode: req.body.dresscode,
        id: req.body.id
    });
    event.save()
     .then(result => {
         res.status(200).json({ message: 'Event added successfully!', event: event });
         console.log('Event saved:', result);
    })
        .catch(error => {
            console.error('Error saving event:', error);
        });
    // res.status(201).json({
    //     message: 'Event added successfully!'
    // });
})
router.get("/event", (req, res, next) => {
    Event.find()
        .then(events => {
            console.log(events);
            res.status(200).json({
                message: 'Posts fetched successfully!',
                eventList: events
            })
        });
});

// router.put("/user/:id", (req, res, next) => {
//     const user = new User({
//         _id: req.body.id,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         currentPosition: req.body.currentPosition,
//         age: req.body.age,
//         city: req.body.city,
//         address: req.body.address,
//     })
//     User.updateOne( {_id: req.body.id}, user).then(result => {
//         console.log(result);
//         res.status(200).json({message: "Updated user", user: user});
//     })
// })

// router.delete("/user/:id", (req, res, next) => {
//     User.deleteOne({_id: req.params.id}).then(result => {
//         res.status(200).json({message: "Post deleted"});
//     })
// });

module.exports = router;
