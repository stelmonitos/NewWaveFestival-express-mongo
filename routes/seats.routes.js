const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller')

router.route('/api/seats').get(SeatController.all);
router.get('/api/seats/random', SeatController.random);
router.get('/api/seats/:id', SeatController.id);
router.put('/api/seats/:id', SeatController.put)
router.post('/api/seats', SeatController.post);
router.delete('/api/seats/:id', SeatController.delete);

module.exports = router;