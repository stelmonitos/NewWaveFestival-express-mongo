const express = require('express');
const uuid = require('uuid');
const { testimonials } = require('../db');
const db = require('../db.js');
const router = express.Router();

router.route('/api/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.get('/api/testimonials/random', (req, res) => {
    const testimonial = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
    res.json(testimonial);
});

router.get('/api/testimonials/:id', (req, res) => {
    const id = req.params.id;
    const testimonial = db.testimonials.find(t => t.id == id);
    if (testimonial) {
        res.json(testimonial);
    } else {
        console.log(testimonial)
    }
});

router.put('/api/testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    const id = req.params.id;
    const index = db.testimonials.findIndex(t => t.id == id);
    if (index != -1) {
        db.testimonials[index].author = author;
        db.testimonials[index].text = text;
        res.json(m);
    }
})

router.post('/api/testimonials', (req, res) => {
    const { author, text } = req.body;
    id = uuid.v4();
    const testimonial = { id, author, text };
    db.testimonials.push(testimonial);
    res.json(m);
});

const m = {
    message: 'OK',
}
const e = {
    message: 'error',
}

router.delete('/api/testimonials/:id', (req, res) => {
    const id = req.params.id;
    const index = db.testimonials.findIndex(t => t.id == id);
    if (index != -1) {
        db.testimonials.splice(index, 1);
        res.json(m);
    } else {
        res.json(e);
    }
});

module.exports = router;