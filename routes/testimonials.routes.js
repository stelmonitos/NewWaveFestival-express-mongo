const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonials.model');


router.route('/api/testimonials').get(async (req, res) => {
    try {
        res.json(await Testimonial.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get('/api/testimonials/random', async (req, res) => {
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
});

router.get('/api/testimonials/:id', async (req, res) => {
    try {
        const tes = await Testimonial.findById(req.params.id);
        if (!tes) res.status(404).json(nf)
        else res.json(tes)
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

router.put('/api/testimonials/:id', async (req, res) => {
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
});

router.post('/api/testimonials', async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTestimonial = new Testimonial({ author, text });
        await newTestimonial.save();
        res.json(ok);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

const ok = { message: 'OK' }
const nf = { message: 'Not found... :(' }

router.delete('/api/testimonials/:id', async (req, res) => {
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
});

module.exports = router;