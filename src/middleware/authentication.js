import { body, } from 'express-validator';

export const validateSignUpDetails = () => ([
  body('username', 'Username cannot be empty').not().isEmpty().trim(),
  body('username', 'must be at least 5 characters long').isLength({ min: 5 }).trim(),
  body('email', 'Email cannot be empty').not().isEmpty().trim(),
  body('email', 'Please enter a valid email').isEmail().trim(),
  body('password', 'Password cannot be empty').not().isEmpty().trim(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }).trim(),
])

export const validateLoginDetails = () => ([
  body('email', 'Email cannot be empty').not().isEmpty().trim(),
  body('email', 'Please enter a valid email').isEmail().trim(),
  body('password', 'Password cannot be empty').not().isEmpty().trim(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }).trim(),
])
