const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

router.route('/api/testimonials').get( TestimonialController.all);
router.get('/api/testimonials/random', TestimonialController.random);
router.get('/api/testimonials/:id', TestimonialController.id);
router.put('/api/testimonials/:id', TestimonialController.put);
router.post('/api/testimonials', TestimonialController.post);
router.delete('/api/testimonials/:id', TestimonialController.delete);

module.exports = router;