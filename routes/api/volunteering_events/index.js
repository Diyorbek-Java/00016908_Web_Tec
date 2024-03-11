const express = require('express');
const { validationResult } = require('express-validator');
const { addEventValidation, deleteEventValidation } = require('../../../validators/event');

const router = express.Router();
const controller = require('../../../controllers/api/events');

// Define API routes
router.get('/', (req, res)=>{
    controller.getAll(req, res);
});

router.post('/', addEventValidation(), (req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    controller.create(req, res)
})

router.delete('/:id', deleteEventValidation(), (req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  controller.delete(req, res)
})

module.exports = router;
