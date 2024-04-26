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
  { 
    id: 1, 
    title: 'The Avengers', 
    seatCategories: [
      { name: 'VIP', seats: Array(50).fill('available') },
      { name: 'Standard', seats: Array(100).fill('available') },
      { name: 'Economy', seats: Array(150).fill('available') }
    ] 
  },
  { 
    id: 2, 
    title: 'The Shawshank Redemption', 
    seatCategories: [
      { name: 'VIP', seats: Array(30).fill('available') },
      { name: 'Standard', seats: Array(80).fill('available') },
      { name: 'Economy', seats: Array(120).fill('available') }
    ] 
  },
  { 
    id: 3, 
    title: 'The Godfather', 
    seatCategories: [
      { name: 'VIP', seats: Array(40).fill('available') },
      { name: 'Standard', seats: Array(90).fill('available') },
      { name: 'Economy', seats: Array(140).fill('available') }
    ] 
  },
  { 
    id: 4, 
    title: 'something', 
    seatCategories: [
      { name: 'VIP', seats: Array(40).fill('available') },
      { name: 'Standard', seats: Array(90).fill('available') },
      { name: 'Economy', seats: Array(140).fill('available') }
    ] 
  }
   
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
        console.log(`${movie.id}. ${movie.title}:`);
        movie.seatCategories.forEach(category => {
          const availableSeats = category.seats.filter(seat => seat === 'available').length;
          console.log(`- ${category.name} (${availableSeats} seats available)`);
        });
      });
    } catch (error) {
      console.error('Error fetching movies from database:', error);
    }
  }
}


async function bookTicket(movieId, categoryName, selectedSeat) {
  const moviesCollection = await connectDatabase();
  if (moviesCollection) {
    try {
      const movie = await moviesCollection.findOne({ id: movieId });
      if (!movie) {
        console.log('Movie not found');
        return;
      }
      
      // Find the category within the movie
      const category = movie.seatCategories.find(cat => cat.name === categoryName);
      if (!category) {
        console.log('Category not found');
        return;
      }

      // Check if the selected seat is available
      if (category.seats[selectedSeat] !== 'available') {
        console.log(`Seat ${selectedSeat} in category ${categoryName} is already booked`);
        return;
      }
      
      // Book the selected seat
      category.seats[selectedSeat] = 'booked';
      
      // Update the movie in the database
      await moviesCollection.updateOne(
        { id: movieId, 'seatCategories.name': categoryName },
        { $set: { 'seatCategories.$.seats': category.seats } }
      );

      console.log(`Successfully booked seat ${selectedSeat} in category ${categoryName} for ${movie.title}`);
    } catch (error) {
      console.error('Error booking ticket:', error);
    }
  }
}


async function runExample() {
  await initializeMoviesCollection();
  await displayMovies();
  await bookTicket(1, 'VIP', 10); // Book seat 10 in the VIP category for movie with ID 1
  await bookTicket(1, 'Standard', 11);
  await bookTicket(1, 'Economy', 12);
  await displayMovies();
  await bookTicket(2, 'VIP', 12);
  await bookTicket(2, 'VIP', 11);
  await bookTicket(2, 'VIP', 13)
  await displayMovies();
  await bookTicket(3, 'VIP', 1);
  await bookTicket(3, 'Economy', 2);
  await bookTicket(3, 'Economy', 3);
  await displayMovies();
  await bookTicket(4, 'vip', 2);
  await bookTicket(3, 'vip', 3);
  await displayMovies();
}

runExample();
