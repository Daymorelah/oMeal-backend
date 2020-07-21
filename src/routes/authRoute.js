import HelperMethods from '../helpers/helperMethods';
import AuthController from '../controllers/authentication';
import { validateSignUpDetails, validateLoginDetails} from '../middleware/authentication'

const authRoutes = app => {
  app.post(
    '/api/v1/auth/signup',
    validateSignUpDetails(),
    HelperMethods.validateMiddleware,
    AuthController.signUp,
  );
  app.post(
    '/api/v1/auth/login',
    validateLoginDetails(),
    HelperMethods.validateMiddleware,
    AuthController.login,
  );
};

export default authRoutes;
