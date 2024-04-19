// app.js

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = decoded.user;
        next();
    });
}

app.use('/users', userRouter);
app.use('/movies', verifyToken, movieRouter);

app.listen(3000, () => console.log('Server started'));
