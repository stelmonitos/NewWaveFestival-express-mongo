const express = require('express');
const uuid = require('uuid');
const { seats } = require('../db');
const db = require('../db.js');
const router = express.Router();

router.route('/api/seats').get((req, res) => {
    res.json(db.seats);
});

router.get('/api/seats/random', (req, res) => {
    const seatId = db.seats[Math.floor(Math.random() * db.seats.length)];
    res.json(seatId);
});

router.get('/api/seats/:id', (req, res) => {
    const id = req.params.id;
    const seat = db.seats.find(t => t.id == id);
    console.log(seat);
    if (seat) {
        res.json(seat);
    } else {
        res.json(e)
    }
});

router.put('/api/seats/:id', (req, res) => {
    const { day, seat, client, email } = req.body;
    const id = req.params.id;
    const index = db.seats.findIndex(t => t.id == id);
    if (index != -1) {
        db.seats[index].day = day;
        db.seats[index].seat = seat;
        db.seats[index].client = client;
        db.seats[index].email = email;
        res.json(m);
    }
})

router.post('/api/seats', (req, res) => {
    const { day, seat, client, email } = req.body;
    const isSeatTaken = db.seats.some(s => s.day === day && s.seat === seat);
    if (isSeatTaken) {
        return res.status(400).json({ message: "The slot is already taken..." });
    }
    const id = uuid.v4();
    const newSeat = { id, day, seat, client, email };
    db.seats.push(newSeat);
    req.io.emit('update', db.seats);
    res.json(m);

});

const m = {
    message: 'OK',
}
const e = {
    message: 'error',
}

router.delete('/api/seats/:id', (req, res) => {
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