import HelperMethods from '../helpers/helperMethods';
import AuthController from '../controllers/authentication';
import { validateSignUpDetails, } from '../middleware/authentication'

const authRoutes = app => {
  app.post(
    '/api/v1/auth/signup',
    validateSignUpDetails(),
    HelperMethods.validateMiddleware,
    AuthController.signUp,
  );
};

export default authRoutes;
