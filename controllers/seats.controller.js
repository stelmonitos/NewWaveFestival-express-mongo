const Seat = require('../models/seats.model')

const ok = { message: 'OK' }
const nf = { message: 'Not found... :(' }

exports.all = async (req, res) => {
    try {
        const seat = await Seat.find();
        res.json(seat)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
exports.random = async (req, res) => {
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
}
exports.id = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id)
        if(!seat) res.status(404).json(nf)
        else res.json(seat)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
exports.put = async (req, res) => {
    try {
        const { day, seat, client, email } = req.body
        const s = await Seat.findById(req.params.id)
        if (s) {
          s.day = day;
          s.seat = seat;
          s.client = client;
          s.email = email;
          await s.save();
          res.json(s)  
        } else res.status(404).json(nf)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
exports.post = async (req, res) => {
    try{
        const { day, seat, client, email } = req.body;
        const newSeat = new Seat({day, seat, client, email})
        await newSeat.save();
        res.json(ok);
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
exports.delete = async (req, res) => {
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
}
