const express = require('express');
const app = express();

const seatsRoutes = require('./routes/seats.routes.js')
const concertsRoutes = require('./routes/concerts.routes.js')
const testimonialsRoutes = require('./routes/testimonials.routes.js')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(testimonialsRoutes);
app.use(concertsRoutes);
app.use(seatsRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

app.listen(4000, () => {
    console.log('Server is running on port: 4000');
})