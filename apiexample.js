const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';
const dbName = 'movieTickets';

app.use(express.json());

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

// Endpoint to display available movies and seats
app.get('/movies', async (req, res) => {
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
});

// Endpoint to book a movie ticket
app.post('/book', async (req, res) => {
  const { movieId, categoryName, selectedSeat } = req.body;
  if (!movieId || !categoryName || !selectedSeat) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const moviesCollection = await connectDatabase();
  if (moviesCollection) {
    try {
      const movie = await moviesCollection.findOne({ id: movieId });
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      
      const category = movie.seatCategories.find(cat => cat.name === categoryName);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      if (category.seats[selectedSeat] !== 'available') {
        return res.status(400).json({ error: `Seat ${selectedSeat} in category ${categoryName} is already booked` });
      }
      
      category.seats[selectedSeat] = 'booked';
      
      await moviesCollection.updateOne(
        { id: movieId, 'seatCategories.name': categoryName },
        { $set: { 'seatCategories.$.seats': category.seats } }
      );

      res.json({ message: `Successfully booked seat ${selectedSeat} in category ${categoryName} for ${movie.title}` });
    } catch (error) {
      console.error('Error booking ticket:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
