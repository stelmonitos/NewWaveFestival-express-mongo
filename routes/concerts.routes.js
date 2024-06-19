const express = require('express');
const router = express.Router();

const Concerts = require('../models/concerts.model');

const ok = { message: 'OK' }
const nf = { message: 'Not found... :(' }

router.route('/api/concerts').get( async (req, res) => {
    try {
        const con = await Concerts.find();
        res.json(con);
    } catch (err){
        res.status(500).json({message: err })
    }
});

router.get('/api/concerts/random', (req, res) => {
    const concert = db.concerts[Math.floor(Math.random() * db.concerts.length)];
    res.json(concert);
});

router.get('/api/concerts/:id', (req, res) => {
    const id = req.params.id;
    const concert = db.concerts.find(t => t.id == id);
    if (concert) {
        res.json(concert);
    } else {
        res.json(e)
    }
});

router.put('/api/concerts/:id', (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const id = req.params.id;
    const index = db.concerts.findIndex(t => t.id == id);
    if (index != -1) {
        db.concerts[index].performer = performer;
        db.concerts[index].genre = genre;
        db.concerts[index].price = price;
        db.concerts[index].day = day;
        db.concerts[index].image = image;
        res.json(m);
    }
})

router.post('/api/concerts', (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    id = uuid.v4();
    const concert = { id, performer, genre, price, day, image };
    db.concerts.push(concert);
    res.json(m);
});

router.delete('/api/concerts/:id', (req, res) => {
    const id = req.params.id;
    const index = db.concerts.findIndex(t => t.id == id);
    if (index != -1) {
        db.concerts.splice(index, 1);
        res.json(m);
    } else {
        res.json(e);
    }
});

module.exports = router;