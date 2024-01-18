const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({ // only a blueprint, we need to turn this into a model in order to use it
    id: Number,
    eventType: String,
    eventName: String,
    guestsAmount: String,
    date: Date,
    address: String,
    dresscode: String,
});

module.exports = mongoose.model('Events', eventSchema);