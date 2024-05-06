const express = require('express');
const { MongoClient } = require('mongodb');
const { Message } = require('twilio/lib/twiml/MessagingResponse');

const app = express();
const uri = ''
const dbName = 'movietickets';

app.use(express.json());

async function connectDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbname);
        return db.collection('movies');
    } catch (error) {
        console.error('error connecting to the database:', error);
    }
}

app.get('/movies', async (req, res) => {
    const moviesCollection = await connectDatabase();
    if (moviesCollection) {
        try {
            const movies = await moviesCollection.find({}).toArray();
            res.json(movies);
          } catch (error) {
            console.error('error fetching movies from database:', error);
            res.status(500).json({ error: 'internal server error' });

          }
    }
});

app.post('/book', async (req, res)=> {
    const { movieId, categoryName, selectedSeat } = req.body;
    if(!movieId || !categoryName || !selectedSeat) {
        return res.status(400).json({ error: 'missing parameters' });
     }

     const moviesCollection = await connectDatabase();
     if (moviesCollection) {
        try {
           const movie = await moviesCollection.findOne({ id: movieId });
           if (!movie) {
            return res.status(404).json({ error: 'movie not found' });
           }

           const category = movie.seatcategories.find(cat => cat.name === categoryName);
           if (!category) {
            return res.status(404).json({ error: 'category not found' });
          }

          if (category.seats[selectedSeat] !== 'available') {
            return res.status(400).json({ error: `seat ${selectedSeat} in category ${categoryName} is alaready booked` });
          }

          category.seats[selectedSeat] = 'booked';

          await moviesCollection.updateOne(
            { id: movieId, 'seatcategories.name': categoryName},
            { $set: { 'seatcategories.$.seats': category.seats } }
          );

          res.json({ Message: `successfully booked seat ${selectedSeat} in category ${categoryName} for ${movie.title}` });
        } catch (error) {
            console.Console.error('error booking ticket:', error);
            res.status(500).json({ error: 'internal server error' });
        }
     }
});

app.post('/book', async (req, res) =>{
    const { movieId, categoryName, selectedSeat } = req.body;
    if (!movieId || !categoryName || !selectedSeat) {
        return res.status(400).json({ error: 'missing parameters' });
     }
     
     const moviesCollection = await connectDatabase();
     if (moviesCollection) {
        try {
            const movie = await moviesCollection.findOne({ id: movieId });
            if (!movie) {
                return res.status(404).json({ error: 'movie not found' });
             }
            const category = movie.seatcategories.find(cat => cat.name === categoryName);
            if (!category) {
                return res.status(404).json({ error: 'category not found' });
             }
             if (category.seats[selectedSeat].status !== 'available') {
                return res.status(400).json({ error: `seats ${selectedSeat} in category ${categoryName} is already booked` });
             }

             const totalPrice = category.seats[selectedSeat].price;
             category.seats[selectedSeat].status = 'booked';
             await moviesCollection.updateOne(
                { id: movieId, 'seatcategories.name': categoryName},
                { $set: { 'seatcategories.$.seats': category.seats } }
             );
             res.json({ Message: `successfully booked seat ${selectedSeat} in category ${categoryName} for ${movie.title}. total price: $${totalPrice}` });
           } catch (error) {
            console.error('error booking ticket:', error);
            res.status(500).json({ error: 'internal server error' });
          }
     }
});

app.put('/movies/:id', async (req, res) =>{
    const movieid = req.params.id;
    const updatedMovieData = req.body;
    const moviesCollection = await connectDatabase();
    if (moviesCollection) {
        try {
            const result = await moviesCollection.updateOne(
               { id: parseInt(movieid) },
               { $set: updatedMovieData }   
            );
            if (result.modifiedCount === 0) {
                return res.status(404).json({ error: 'movie not found' });
           }
           res.json({ Message: 'movie updated successfully', movieid: movieid });
         } catch (Error) {
            console.error('error updating movie:', error);
            res.status(500).json({ error: 'internal server error' }); 
        }
    }
});

app.get('/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    const moviesCollection = await connectDatabase();
    if (moviesCollection) {
        try {
            const movie = await moviesCollection.findOne({ id: parseInt(movieId) });
            if (!movie) {
                return res.status(404).json({ error:'movie not found' });
            }
            res.json(movie);
        } catch (error) {
            console.error('error fetching movie from the databse:', error);
            res.status(500).json({ error: 'internal server error' });

        }
    }
});
