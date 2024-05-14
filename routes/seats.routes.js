const express = require('express');
const app = express();
const uuid = require('uuid');
const { seats } = require('../db');
const db = require('../db.js');
const router = express.Router();

router.route('/api/seats').get((req, res) => {
    res.json(db.seats);
});

app.get('/api/seats', (req, res) => {
    res.json(db.seats);
})
app.get('/api/seats/random', (req, res) => {
    const seat = db.seats[Math.floor(Math.random() * db.seats.length)];
    res.json(seat);
});

app.get('/api/seats/:id', (req, res) => {
    const id = req.params.id;
    const seat = db.find(t => t.id == id);
    if (seat) {
        res.json(seat);
    } else {
        res.json(e)
    }
});

app.put('/api/seats/:id', (req, res) => {
    const { author, text } = req.body;
    const id = req.params.id;
    const index = db.seats.findIndex(t => t.id == id);
    if (index != -1) {
        db.seats[index].author = author;
        db.seats[index].text = text;
        res.json(m);
    }
})

app.post('/api/seats', (req, res) => {
    const { author, text } = req.body;
    id = uuid.v4();
    const seat = { id, author, text };
    db.seats.push(seat);
    res.json(m);
});

const m = {
    message: 'OK',
}
const e = {
    message: 'error',
}

app.delete('/api/seats/:id', (req, res) => {
    const id = req.params.id;
    const index = db.seats.findIndex(t => t.id == id);
    if (index != -1) {
        db.seats.splice(index, 1);
        res.json(m);
    } else {
        res.json(e);
    }
});

module.exports = router;