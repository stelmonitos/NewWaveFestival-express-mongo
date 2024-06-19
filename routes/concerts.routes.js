const express = require('express');
const router = express.Router();

const Concerts = require('../models/concerts.model');

const ok = { message: 'OK' }
const nf = { message: 'Not found... :(' }

router.route('/api/concerts').get(async (req, res) => {
    try {
        const con = await Concerts.find();
        res.json(con);
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
});

router.get('/api/concerts/random', async (req, res) => {
    try {
        const count = await Concerts.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const con = await Concerts.findOne({}).skip(rand);
        if (!con) res.status(404).json(nf);
        else res.json(con);
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
});

router.get('/api/concerts/:id', async (req, res) => {
    try {
        const con = await Concerts.findById(req.params.id);
        if (!con) res.status(404).json(nf);
        else res.json(con)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
});

router.put('/api/concerts/:id', async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const con = await Concerts.findById(req.params.id);
        if (con) {
            con.performer = performer;
            con.genre = genre;
            con.price = price;
            con.day = day;
            con.image = image;
            await con.save();
            res.json(con)
        } else res.status(404).json(nf)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
})

router.post('/api/concerts', async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const newConcert = new Concerts({ performer, genre, price, day, image })
        await newConcert.save();
        res.json(newConcert)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
});

router.delete('/api/concerts/:id', async (req, res) => {
    try {
        const con = await Concerts.findById(req.params.id);
        if (con){
            await Concerts.deleteOne({ _id: req.params.id })
            res.json(con);
        } else res.status(404).json(nf);
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
});

module.exports = router;