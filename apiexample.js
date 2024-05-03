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
// POST method to add a new movie
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
        
        if (category.seats[selectedSeat].status !== 'available') {
          return res.status(400).json({ error: `Seat ${selectedSeat} in category ${categoryName} is already booked` });
        }
        
        // Calculate the total price based on the selected seat's category
        const totalPrice = category.seats[selectedSeat].price;
        
        category.seats[selectedSeat].status = 'booked';
        
        await moviesCollection.updateOne(
          { id: movieId, 'seatCategories.name': categoryName },
          { $set: { 'seatCategories.$.seats': category.seats } }
        );
  
        res.json({ message: `Successfully booked seat ${selectedSeat} in category ${categoryName} for ${movie.title}. Total price: $${totalPrice}` });
      } catch (error) {
        console.error('Error booking ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
  

// PUT or PATCH method to update an existing movie
app.put('/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    const updatedMovieData = req.body;
    const moviesCollection = await connectDatabase();
    if (moviesCollection) {
        try {
            const result = await moviesCollection.updateOne(
                { id: parseInt(movieId) },
                { $set: updatedMovieData }
            );
            if (result.modifiedCount === 0) {
                return res.status(404).json({ error: 'Movie not found' });
            }
            res.json({ message: 'Movie updated successfully', movieId: movieId });
        } catch (error) {
            console.error('Error updating movie:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }   
});


// GET method to retrieve a specific movie by ID
app.get('/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    const moviesCollection = await connectDatabase();
    if (moviesCollection) {
        try {
            const movie = await moviesCollection.findOne({ id: parseInt(movieId) });
            if (!movie) {
                return res.status(404).json({ error: 'Movie not found' });
            }
            res.json(movie);
        } catch (error) {
            console.error('Error fetching movie from database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
app.post('/movies', async (req, res) => {
    const newMovie = req.body;
    const moviesCollection = await connectDatabase();
    if (moviesCollection) {
        try {
            await moviesCollection.insertOne(newMovie);
            res.status(201).json({ message: 'Movie created successfully' });
        } catch (error) {
            console.error('Error creating movie:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
app.delete('/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    const moviesCollection = await connectDatabase();
    if (moviesCollection) {
        try {
            const result = await moviesCollection.deleteOne({ id: parseInt(movieId) });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Movie not found' });
            }
            res.json({ message: 'Movie deleted successfully' });
        } catch (error) {
            console.error('Error deleting movie:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Ticket Booking API');
});
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
