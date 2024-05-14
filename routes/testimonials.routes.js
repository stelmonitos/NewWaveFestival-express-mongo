const express = require('express');
const app = express();
const uuid = require('uuid');
const { testimonials } = require('../db');
const db = require('../db.js');
const router = express.Router();

router.route('/api/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

app.get('/api/testimonials', (req, res) => {
    res.json(db.testimonials);
})
app.get('/api/testimonials/random', (req, res) => {
    const testimonial = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
    res.json(testimonial);
});

app.get('/api/testimonials/:id', (req, res) => {
    const id = req.params.id;
    const testimonial = db.find(t => t.id == id);
    if (testimonial) {
        res.json(testimonial);
    } else {
        res.json(e)
    }
});

app.put('/api/testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    const id = req.params.id;
    const index = db.testimonials.findIndex(t => t.id == id);
    if (index != -1) {
        db.testimonials[index].author = author;
        db.testimonials[index].text = text;
        res.json(m);
    }
})

app.post('/api/testimonials', (req, res) => {
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

app.delete('/api/testimonials/:id', (req, res) => {
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