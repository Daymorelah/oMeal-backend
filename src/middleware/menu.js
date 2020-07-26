import { body, param } from 'express-validator';

export const validateGetAMenu = () => ([
  param('id', 'The id field is required').notEmpty().trim(),
  param('id', 'The id field must be a string').isString().trim(),
  param('id', 'Menu Id is not valid').isUUID().trim(),
]);

export const validateEditMenu = () => ([
  body('id', 'The id field is required').notEmpty().trim(),
  body('id', 'The id field must be a string').isString().trim(),
  body('id', 'Menu Id is not valid').isUUID().trim(),
]);

export const validateCreateMenu = () => ([
  body('name', 'The name field is required').notEmpty().trim(),
  body('name', 'The name field must be a string').isString().trim(),
  body('prize', 'The prize field is required').notEmpty().trim(),
  body('prize', 'The prize field must be a string').isString().trim(),
  body('category', 'The category field is required').notEmpty().trim(),
  body('category', 'The category field must be a string').isString().trim(),
]);

export const validateDeleteMenu = () => ([
  body('id', 'The id field is required').notEmpty().trim(),
  body('id', 'The id field must be a string').isString().trim(),
  body('id', 'Menu Id is not valid').isUUID().trim(),
]);
