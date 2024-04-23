const { MongoClient } = require('mongodb');

class Event {
    constructor(name, capacity, ticketsSold = 0) {
        this.name = name;
        this.capacity = capacity;
        this.ticketsSold = ticketsSold;
    }

    ticketsAvailable() {
        return this.capacity - this.ticketsSold;
    }

    sellTickets(quantity) {
        if (this.ticketsAvailable() >= quantity) {
            this.ticketsSold += quantity;
            console.log(`${quantity} tickets sold for ${this.name}`);
            return true;
        } else {
            console.log("Not enough tickets available.");
            return false;
        }
    }
}

class TicketBookingSystem {
    constructor(db) {
        this.db = db;
    }

    async addEvent(name, capacity) {
        const event = new Event(name, capacity);
        const collection = this.db.collection('events');
        await collection.insertOne(event);
        console.log(`Event '${name}' added to the system with a capacity of ${capacity}.`);
    }

    async bookTickets(eventName, quantity) {
        const collection = this.db.collection('events');
        const event = await collection.findOne({ name: eventName });
        if (event) {
            const success = event.sellTickets(quantity);
            if (success) {
                await collection.updateOne({ name: eventName }, { $set: { ticketsSold: event.ticketsSold } });
            }
        } else {
            console.log(`Event '${eventName}' not found in the system.`);
        }
    }
}

// Example usage:
const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db('ticket_booking');
        const bookingSystem = new TicketBookingSystem(db);

        // Add events to the system
        await bookingSystem.addEvent("Concert", 100);
        await bookingSystem.addEvent("Theater Play", 50);

        // Book tickets for events
        await bookingSystem.bookTickets("Concert", 50);
        await bookingSystem.bookTickets("Concert", 70); // Not enough tickets available
        await bookingSystem.bookTickets("Football Match", 10); // Event not found in the system
    } finally {
        await client.close();
    }
}

main().catch(console.error);
