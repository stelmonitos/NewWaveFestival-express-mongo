const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.route('/api/concerts').get( ConcertController.getAll);
router.get('/api/concerts/random', ConcertController.random);
router.get('/api/concerts/:id', ConcertController.id);
router.put('/api/concerts/:id', ConcertController.put);
router.post('/api/concerts', ConcertController.post);
router.delete('/api/concerts/:id', ConcertController.delete);

module.exports = router;