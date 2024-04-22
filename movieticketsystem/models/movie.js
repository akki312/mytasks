// models/movie.js

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: String,
    director: String,
    releaseDate: Date,
    duration: Number,
    price: Number,
    seats: {
        type: Number,
        default: 100
    }
});

module.exports = mongoose.model('Movie', movieSchema);
