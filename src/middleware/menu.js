import { body, param } from 'express-validator';

export const validateGetAMenu = () => ([
  param('id', 'The id field is required').notEmpty().trim(),
  param('id', 'Menu ID is not valid').isUUID().trim(),
]);

export const validateEditMenu = () => ([
  body('id', 'The id field is required').notEmpty().trim(),
  body('id', 'Menu ID is not valid').isUUID().trim(),
]);
