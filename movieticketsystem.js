const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define seat schema
const seatSchema = new mongoose.Schema({
  number: Number,
  status: { type: String, enum: ['available', 'booked'], default: 'available' }
});

// Define movie schema
const movieSchema = new mongoose.Schema({
  title: String,
  seats: [seatSchema]
});

// Create movie model
const Movie = mongoose.model('Movie', movieSchema);

// Function to display available seats for a movie
async function displayAvailableSeats(movieId) {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      console.log('Movie not found');
      return;
    }
    console.log(`Available seats for ${movie.title}:`);
    movie.seats.forEach(seat => {
      if (seat.status === 'available') {
        console.log(`Seat ${seat.number}`);
      }
    });
  } catch (err) {
    console.error('Error fetching movie:', err);
  }
}

// Function to book a seat
async function bookSeat(movieId, seatNumber) {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      console.log('Movie not found');
      return;
    }
    const seat = movie.seats.find(seat => seat.number === seatNumber);
    if (!seat) {
      console.log('Seat not found');
      return;
    }
    if (seat.status === 'booked') {
      console.log('Seat already booked');
      return;
    }
    seat.status = 'booked';
    await movie.save();
    console.log(`Seat ${seatNumber} booked successfully for ${movie.title}`);
  } catch (err) {
    console.error('Error booking seat:', err);
  }
}

// Example usage
const movieId = 'movie_id_here'; // Replace 'movie_id_here' with the actual movie ID
displayAvailableSeats(movieId);
bookSeat(movieId, 1); // Book seat number 1
displayAvailableSeats(movieId);
