const express = require('express');
const router = express.Router();
const Seat = require('../models/seats.model')

const ok = { message: 'OK' }
const nf = { message: 'Not found... :(' }

router.route('/api/seats').get(async (req, res) => {
    try {
        const seat = await Seat.find();
        res.json(seat)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
});

router.get('/api/seats/random', async (req, res) => {
    try {
        const count = await Seat.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const seat = await Seat.findOne({}).skip(rand)
        if (!seat) res.status(404).json(nf)
        else res.json(seat);
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
});

router.get('/api/seats/:id', async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id)
        if(!seat) res.status(404).json(nf)
        else res.json(seat)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
});

router.put('/api/seats/:id', async (req, res) => {
    try {
        const { day, seat, client, email } = req.body
        const s = await Seat.findById(req.params.id)
        if (s) {
          s.day = day;
          s.seat = seat;
          s.client = client;
          s.email = email;
          await s.save();
          res.json(ok)  
        } else res.status(404).json(nf)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
})

router.post('/api/seats', async (req, res) => {
    try{
        const { day, seat, client, email } = req.body;
        const newSeat = new Seat({day, seat, client, email})
        await newSeat.save();
        res.json(ok);
    }
    catch (err) {
        res.status(500).json({ message: err })
    }

});

router.delete('/api/seats/:id', async (req, res) => {
    try{
        const s = await Seat.findById(req.params.id);
        if(s){
            await Seat.deleteOne({ _id: req.params.id })
            res.json({message: s})
        } else res.status(404).json({nf})
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
});

module.exports = router;