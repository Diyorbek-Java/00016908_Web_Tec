const express = require('express');
const { validationResult } = require('express-validator');
const { addEventValidation, deleteEventValidation,updateEventsValidation } = require('../../../validators/event');

const router = express.Router();
const event_controller = require('../../../controllers/api/events');

// Define API routes
router.get('/', (req, res)=>{
    event_controller.getAll(req, res);
});

router.post('/', addEventValidation(), (req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    event_controller.create(req, res)
})

router.delete('/:id', deleteEventValidation(), (req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  event_controller.delete(req, res)
})
router.put('/:id', updateEventsValidation(), (req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  event_controller.update(req, res)
})



module.exports = router;
