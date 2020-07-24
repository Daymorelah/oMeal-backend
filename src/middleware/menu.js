import { param } from 'express-validator';

export const validateGetAMenu = () => ([
  param('id', 'Menu ID is not valid').isUUID().trim(),
]);
