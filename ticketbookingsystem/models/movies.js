const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    duration: Number,
    genre: String,
    // Add more fields as needed
});

module.exports = mongoose.model('Movie', movieSchema);
