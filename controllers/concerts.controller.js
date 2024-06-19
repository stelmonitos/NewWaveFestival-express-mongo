const Concert = require('../models/concerts.model')

const nf = { message: 'Not found... :(' }

exports.getAll = async (req, res) => {
        try {
            const con = await Concert.find();
            res.json(con);
        }
        catch (err) {
            res.status(500).json({ message: err })
        }
}
exports.random = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const con = await Concert.findOne({}).skip(rand);
        if (!con) res.status(404).json(nf);
        else res.json(con);
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
exports.id = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if (!con) res.status(404).json(nf);
        else res.json(con)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
exports.put = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const con = await Concert.findById(req.params.id);
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
}
exports.post = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const newConcert = new Concert({ performer, genre, price, day, image })
        await newConcert.save();
        res.json(newConcert)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
exports.delete = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if (con){
            await Concert.deleteOne({ _id: req.params.id })
            res.json(con);
        } else res.status(404).json(nf);
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}