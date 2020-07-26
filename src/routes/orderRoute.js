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
  app.get(
    '/api/v1/orders',
    Authorization.checkToken,
    HelperMethods.paginateMiddleware,
    OrderController.getAllOrders,
  );
};

export default orderRoutes