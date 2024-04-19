const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];


app.use(bodyParser.json());


app.get('/api/users', (req, res) => {
    res.json(users);
});


app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});


app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    users = users.map(user => (user.id === userId ? updatedUser : user));
    res.json(updatedUser);
});

// DELETE /api/users/:id - Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
