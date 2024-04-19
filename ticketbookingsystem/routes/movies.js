const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// GET all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render('index', { movies });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render('movie-details', { movie });
    } catch (err) {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// Add more routes for creating, updating, and deleting movies
