const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
})
const io = socket(server);
const seatsRoutes = require('./routes/seats.routes.js')
const concertsRoutes = require('./routes/concerts.routes.js')
const testimonialsRoutes = require('./routes/testimonials.routes.js')
app.use(cors({
    "origin": "ws://localhost:3000",
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(testimonialsRoutes);
app.use(concertsRoutes);
app.use(seatsRoutes);

io.on('connection', (socket) => {
    console.log('New socket!' + socket.id);
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

