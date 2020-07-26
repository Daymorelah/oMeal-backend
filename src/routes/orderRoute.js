import HelperMethods from '../helpers/helperMethods';
import OrderController from '../controllers/order';
import Authorization from '../middleware/authorization';
import { validateCreateOrder, validateGetAnOrder, validateEditAnOrder, } from '../middleware/order';

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
  app.get(
    '/api/v1/order/:id',
    Authorization.checkToken,
    validateGetAnOrder(),
    HelperMethods.validateMiddleware,
    OrderController.getAnOrder,
  );
  app.patch(
    '/api/v1/order',
    Authorization.checkToken,
    validateEditAnOrder(),
    HelperMethods.validateMiddleware,
    OrderController.editAnOrder,
  );
};

export default orderRoutes