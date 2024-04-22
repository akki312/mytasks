// routes/movies.js

const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render('movies/index', { movies });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.redirect('/movies');
    } catch (error) {
        res.status(400).json({ error: 'Invalid request' });
    }
});

module.exports = router;
