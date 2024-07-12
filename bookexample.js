const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';
const dbName = 'movieTickets';

async function connectDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    return db.collection('books');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

const booksData = [
  { 
    id: 1, 
    title: 'The Avengers', 
    bookCollection: [
      { author: 'J.K. Rowling', category: 'VIP', available: 50, taken: 0 },
      { author: 'J.K. Rowling', category: 'Standard', available: 100, taken: 0 },
      { author: 'J.K. Rowling', category: 'Economy', available: 150, taken: 0 }
    ] 
  },
  { 
    id: 2, 
    title: 'The Shawshank Redemption', 
    bookCollection: [
      { author: 'J.K. Rowling', category: 'VIP', available: 30, taken: 0, price:30 },
      { author: 'J.K. Rowling', category: 'Standard', available: 80, taken: 0, price:20 },
      { author: 'J.K. Rowling', category: 'Economy', available: 120, taken: 0, price:10 }
    ] 
  },
  { 
    id: 3, 
    title: 'The Godfather', 
    bookCollection: [
      { author: 'J.K. Rowling', category: 'VIP', available: 40, taken: 0, price:400 },
      { author: 'J.K. Rowling', category: 'Standard', available: 90, taken: 0, price:200 },
      { author: 'J.K. Rowling', category: 'Economy', available: 140, taken: 0, price:300 }
    ] 
  },
  { 
    id: 4, 
    title: 'Something', 
    bookCollection: [
      { author: 'J.K. Rowling', category: 'VIP', available: 40, taken: 0 },
      { author: 'J.K. Rowling', category: 'Standard', available: 90, taken: 0 },
      { author: 'J.K. Rowling', category: 'Economy', available: 140, taken: 0 }
    ] 
  },
  { 
    id: 5, 
    title: 'That Thing',
    bookCollection: [
      { author: 'J.K. Rowling', category: 'VIP', available: 40, taken: 0 },
      { author: 'J.K. Rowling', category: 'Standard', available: 90, taken: 0 },
      { author: 'J.K. Rowling', category: 'Economy', available: 140, taken: 0 }
    ] 
  }
];

async function bookCollection(bookId, categoryName, selectedSeat, couponCode) {
    const booksCollection = await connectDatabase();
    if (booksCollection) {
      try {
        const book = await booksCollection.findOne({ id: bookId });
        if (!book) {
          console.log('Book not found');
          return;
        }
        const category = book.bookCollection.find(cat => cat.category === categoryName);
        if (!category) {
          console.log('Category not found');
          return;
        }
        if (category.seats[selectedSeat] !== 'available') {
          console.log(`Seat ${selectedSeat} in category ${categoryName} is already booked`);
          return;
        }
  
        let totalPrice = category.seats[selectedSeat].price; // Initialize total price with standard price
  
        
  
        // Update takenDate
        category.takenDate = new Date();
  
        category.seats[selectedSeat] = 'booked';
        await booksCollection.updateOne(
          { id: bookId, 'bookCollection.category': categoryName },
          { $set: { 'bookCollection.$.seats': category.seats, 'bookCollection.$.takenDate': category.takenDate } }
        );
        console.log(`Successfully book is taken ${selectedbook} in category ${categoryName} for ${book.title}. Total price: $${totalPrice}`);
      } catch (error) {
        console.error('Error issueing a book :', error);
      }
    }
  }
  

async function displayBooks() {
  const booksCollection = await connectDatabase();
  if (booksCollection) {
    try {
      const books = await booksCollection.find({}).toArray();
      console.log('Available Books:');
      books.forEach(book => {
        console.log(`${book.id}. ${book.title}:`);
        book.bookCollection.forEach(category => {
          console.log(`- ${category.category} (${category.available} available)`);
        });
      });
    } catch (error) {
      console.error('Error fetching books from database:', error);
    }
  }
}

async function runExample() {
  await bookCollection();
  await displayBooks();
  await bookTicket(1, 'VIP', 1);
  await displayBooks();
}
runExample();


