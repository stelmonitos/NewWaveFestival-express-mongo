const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://stelmon:${process.env.DB_PASS}@cluster0.826canr.mongodb.net/NewWaveDB?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Database is connected!');
});
db.on('error', err => console.log('Error'+ err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
})

const io = socket(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

const seatsRoutes = require('./routes/seats.routes.js')
const concertsRoutes = require('./routes/concerts.routes.js')
const testimonialsRoutes = require('./routes/testimonials.routes.js')
app.use(cors({
  origin: '*',
}));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(testimonialsRoutes);
app.use(concertsRoutes);
app.use(seatsRoutes);

io.on('connection', (socket) => {
  console.log('New socket!');
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})


