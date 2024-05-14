const express = require('express');
const app = express();
const uuid = require('uuid');
const { concerts } = require('../db');
const db = require('../db.js');
const router = express.Router();

router.route('/api/concerts').get((req, res) => {
    res.json(db.concerts);
});

app.get('/api/concerts', (req, res) => {
    res.json(db.concerts);
})
app.get('/api/concerts/random', (req, res) => {
    const concert = db.concerts[Math.floor(Math.random() * db.concerts.length)];
    res.json(concert);
});

app.get('/api/concerts/:id', (req, res) => {
    const id = req.params.id;
    const concert = db.find(t => t.id == id);
    if (concert) {
        res.json(concert);
    } else {
        res.json(e)
    }
});

app.put('/api/concerts/:id', (req, res) => {
    const { author, text } = req.body;
    const id = req.params.id;
    const index = db.concerts.findIndex(t => t.id == id);
    if (index != -1) {
        db.concerts[index].author = author;
        db.concerts[index].text = text;
        res.json(m);
    }
})

app.post('/api/concerts', (req, res) => {
    const { author, text } = req.body;
    id = uuid.v4();
    const concert = { id, author, text };
    db.concerts.push(concert);
    res.json(m);
});

const m = {
    message: 'OK',
}
const e = {
    message: 'error',
}

app.delete('/api/concerts/:id', (req, res) => {
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