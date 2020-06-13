import { body, } from 'express-validator';

export const validateSignUpDetails = () => ([
  body('username').not().isEmpty(),
  body('username', 'must be at least 5 characters long').isString().trim().isLength({ min: 5 }),
  body('email', 'Email cannot be empty').not().isEmpty().trim(),
  body('email', 'Please enter a valid email').isEmail().trim(),
  body('password', 'Password cannot be empty').not().isEmpty().trim(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
])

export const validateLoginDetails = () => ([
  body('email', 'Email cannot be empty').not().isEmpty().trim(),
  body('email', 'Please enter a valid email').isEmail().trim(),
  body('password', 'Password cannot be empty').not().isEmpty().trim(),
])
