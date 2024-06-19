const Testimonial = require('../models/testimonials.model');

const ok = { message: 'OK' }
const nf = { message: 'Not found... :(' }

exports.all = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}
exports.random = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const tes = await Testimonial.findOne({}).skip(rand)
        if (!tes) res.status(404).json(nf)
        else res.json(tes);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}
exports.id = async (req, res) => {
    try {
        const tes = await Testimonial.findById(req.params.id);
        if (!tes) res.status(404).json(nf)
        else res.json(tes)
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}
exports.put = async (req, res) => {
try {
        const { author, text } = req.body;
        const tes = await Testimonial.findById(req.params.id)
        if (tes) {
            tes.author = author;
            tes.text = text;
            await tes.save();
            res.json(ok)
        } else res.status(404).json(nf)
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}
exports.post = async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTestimonial = new Testimonial({ author, text });
        await newTestimonial.save();
        res.json(ok);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}
exports.delete = async (req, res) => {
    try {
        const tes = await Testimonial.findById(req.params.id);
        if (tes) {
            await Testimonial.deleteOne({ _id: req.params.id })
            res.json({ message: dep });
        } else res.status(404).json(nf)
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}
