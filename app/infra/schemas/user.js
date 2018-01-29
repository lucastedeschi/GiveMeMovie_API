var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    birth: Date,
    sex: String,
    email: String,
    password: String,
    pictureUrl: String,
    createdOn: { type: Date, default: Date.now },
    updatedOn: Date,
    movies: {
        watched: [{ id: Number, rate: Number }],
        watchLater: [{id: Number}],
        blacklist: [{id: Number}],
    }
});

module.exports = function() {
    try {
        return  mongoose.model('User')
    } catch (error) {
        return  mongoose.model('User', userSchema)
    }
}