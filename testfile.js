const express = require('express');
const app = express();
const port = 3000;

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';
const dbName = 'movieTickets';

async function connectDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    return db.collection('movies');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

const moviesData = [
  { id: 1, title: 'The Avengers', seats: Array(100).fill('available') },
  { id: 2, title: 'The Shawshank Redemption', seats: Array(100).fill('available') },
  { id: 3, title: 'The Godfather', seats: Array(120).fill('available') }
];

async function initializeMoviesCollection() {
  const moviesCollection = await connectDatabase();
  if (moviesCollection) {
    try {
      await moviesCollection.deleteMany({}); 
      await moviesCollection.insertMany(moviesData); 
      console.log('Movies collection initialized');
    } catch (error) {
      console.error('Error initializing movies collection:', error);
    }
  }
}

async function displayMovies(req, res) {
  const moviesCollection = await connectDatabase();
  if (moviesCollection) {
    try {
      const movies = await moviesCollection.find({}).toArray();
      res.json(movies);
    } catch (error) {
      console.error('Error fetching movies from database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

async function bookTicket(req, res) {
  const { movieId, selectedSeats } = req.body;
  const moviesCollection = await connectDatabase();
  if (moviesCollection) {
    try {
      const movie = await moviesCollection.findOne({ id: movieId });
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      for (const seat of selectedSeats) {
        if (movie.seats[seat] !== 'available') {
          return res.status(400).json({ error: `Seat ${seat} is already booked` });
        }
        movie.seats[seat] = 'booked';
      }
      await moviesCollection.updateOne({ id: movieId }, { $set: { seats: movie.seats } });
      return res.json({ message: `Successfully booked ${selectedSeats.length} ticket(s) for ${movie.title}` });
    } catch (error) {
      console.error('Error booking tickets:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.get('/movies', displayMovies);
app.post('/book', bookTicket);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
