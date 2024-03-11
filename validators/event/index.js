const { body,param } = require('express-validator');
const event_service = require('../../services/events')


const addEventValidation = () => {
  return [
    body('eventName')
      .notEmpty().withMessage('Event name must not be empty')
      .isLength({ min: 8, max: 255 }).withMessage('Event name must be between 8 and 255 characters long'),
    body('eventDateTime')
      .notEmpty().withMessage('Event date time must not be empty')
      .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
        .withMessage('Date time format is not match. Please apply "DD/MM/YYYY HH:mm" format.'),
    body('eventPlace')
      .notEmpty().withMessage('Event Place should be filled must not be empty'),
    body('volunteersNumber')
      .notEmpty().withMessage(' Volunteers number should not be empty at least 1 person '),
    body('opporunities')
      .notEmpty().withMessage('Come on there mustbe atlese serificate for volunteering'),      
  ];
};

const deleteEventValidation = () => {
  return [
    // Custom validation to check if the event with the specified ID exists
    param('id').custom(async (id) => {
      const exists = await event__service.getById(id);
      if (!exists) {
        throw new Error('Event not found');
      }
    })
  ];
};


module.exports = {
    addEventValidation,
    deleteEventValidation
};
