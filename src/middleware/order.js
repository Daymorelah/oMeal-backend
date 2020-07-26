import { body, } from 'express-validator';

export const validateCreateOrder = () => ([
  body('meal', 'The meal field is required').notEmpty().trim(),
  body('meal', 'The meal field must be an array').isJSON().trim(),

  body('phoneNumber', 'The phoneNumber field is required').notEmpty().trim(),
  body('phoneNumber', 'The name field must be a string').isString().trim(),

  body('drink', 'The drink field is required').notEmpty().trim(),
  body('drink', 'The drink field must be an array').isJSON().trim(),

  body('address', 'The address field is required').notEmpty().trim(),
  body('address', 'The prize field must be a string').isString().trim(),

  body('orderType', 'The orderType field is required').notEmpty().trim(),
  body('orderType', 'The orderType field must be a string').isString().trim(),
]);
