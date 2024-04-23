const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/'; // MongoDB connection URI
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


async function displayMovies() {
  const moviesCollection = await connectDatabase();
  if (moviesCollection) {
    try {
      const movies = await moviesCollection.find({}).toArray();
      console.log('Available Movies:');
      movies.forEach(movie => {
        const availableSeats = movie.seats.filter(seat => seat === 'available').length;
        console.log(`${movie.id}. ${movie.title} (${availableSeats} seats available)`);
      });
    } catch (error) {
      console.error('Error fetching movies from database:', error);
    }
  }
}

async function bookTicket(movieId, selectedSeats) {
    const moviesCollection = await connectDatabase();
    if (moviesCollection) {
      try {
        const movie = await moviesCollection.findOne({ id: movieId });
        if (!movie) {
          console.log('Movie not found');
          return;
        }
        for (const seat of selectedSeats) {
          if (movie.seats[seat - 1] !== 'available') {
            console.log(`Seat ${seat} is already booked`);
            continue;
          }
          movie.seats[seat - 1] = 'booked';
        }
        await moviesCollection.updateOne({ id: movieId }, { $set: { seats: movie.seats } });
        console.log(`Successfully booked ${selectedSeats.length} ticket(s) for ${movie.title}`);
      } catch (error) {
        console.error('Error booking tickets:', error);
      }
    }
  }
  
  
  async function runExample() {
  await initializeMoviesCollection();
  await displayMovies();
  await bookTicket(1, ['1', '2', '3']);
  await displayMovies();
  await bookTicket(2, [51, 52, 53]);
  await displayMovies();
  await bookTicket(3, [21, 32, 43]);
  await displayMovies();
}

runExample();
