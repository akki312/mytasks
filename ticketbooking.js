// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

let events = [
    { id: 1, name: 'Event 1', ticketsAvailable: 100 },
    { id: 2, name: 'Event 2', ticketsAvailable: 50 },
    { id: 3, name: 'Event 3', ticketsAvailable: 200 }
];
let bookings = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/events', (req, res) => {
    res.json(events);
});

app.post('/bookings', (req, res) => {
    const { eventId, tickets } = req.body;

    const event = events.find(event => event.id === eventId);
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }

    if (event.ticketsAvailable < tickets) {
        return res.status(400).json({ error: 'Not enough tickets available' });
    }

    const booking = { eventId, tickets };
    bookings.push(booking);
    event.ticketsAvailable -= tickets;

    res.status(201).json({ message: 'Tickets booked successfully', booking });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
