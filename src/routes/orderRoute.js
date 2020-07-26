import HelperMethods from '../helpers/helperMethods';
import OrderController from '../controllers/order';
import Authorization from '../middleware/authorization';
import { validateCreateOrder, } from '../middleware/order';

const orderRoutes = app => {
  app.post(
    '/api/v1/order',
    Authorization.checkToken,
    validateCreateOrder(),
    HelperMethods.validateMiddleware,
    OrderController.createOrder,
  );
};

export default orderRoutes