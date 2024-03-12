const { body,param } = require('express-validator');
const event_service = require('../../services/events')


const addEventValidation = () => {
  return [
    body('eventName')
      .notEmpty().withMessage('Event name must not be empty')
      .isLength({ min: 8, max: 255 }).withMessage('Event name must be between 8 and 255 characters long'),
    body('eventDateTime')
      .notEmpty().withMessage('Event date time must not be empty')
        .withMessage('Date time format is not match. Please apply "DD/MM/YYYY HH:mm" format.'),
    body('eventPlace')
      .notEmpty().withMessage('Event Place should be filled must not be empty'),
    body('volunteersNumber')
      .notEmpty().withMessage(' Volunteers number should not be empty at least 1 person '),
    body('opportunities')
      .notEmpty().withMessage('Come on there must be at lease serificate for volunteering'),      
  ];
};

const deleteEventValidation = () => {
  return [
    param('id').custom(async (id) => {
      const exists = await event_service.getById(id);
      if (!exists) {
        throw new Error('Event not found');
      }
    })
  ];
};

const updateEventsValidation = () => {
  return [
    param('id').custom(async (id) => {
      const exists = await event_service.getById(id);
      if (!exists) {
        throw new Error('Event not found');
      }
    }),
    body('eventName')
      .notEmpty().withMessage('Event name must not be empty')
      .isLength({ min: 8, max: 255 }).withMessage('Event name must be between 8 and 255 characters long'),
    body('eventDateTime')
      .notEmpty().withMessage('Event date time must not be empty')
      .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
        .withMessage('Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'),
    body('eventPlace')
      .notEmpty().withMessage('Event Place must not be empty'),
    body('volunteersNumber')
      .notEmpty().withMessage('Number of Volunteers must not be empty'),
    body('opportunities')
      .notEmpty().withMessage('Opportunities must not be empty'),      
  ];
};



module.exports = {
    addEventValidation,
    deleteEventValidation,
    updateEventsValidation
};
