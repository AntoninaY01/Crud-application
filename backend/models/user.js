const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ // only a blueprint, we need to turn this into a model in order to use it
    firstName: String,
    lastName: String,
    currentPosition: String,
    age: Number,
    city: String,
    address: String,
    id: Number
});

module.exports = mongoose.model('User', userSchema);