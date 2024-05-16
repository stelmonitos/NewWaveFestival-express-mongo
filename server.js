const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const seatsRoutes = require('./routes/seats.routes.js')
const concertsRoutes = require('./routes/concerts.routes.js')
const testimonialsRoutes = require('./routes/testimonials.routes.js')
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(testimonialsRoutes);
app.use(concertsRoutes);
app.use(seatsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
})