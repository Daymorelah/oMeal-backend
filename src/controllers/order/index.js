import { pick, omit } from 'lodash'
import Models from '../../models'
import HelperMethods from '../../helpers/helperMethods';

const { Order, } = Models;

/**
 * Class representing the Menu controller
 * @class MenuController
 * @description menu controller
 */
class OrderController {
  /**
   * Create Order
   * Route: POST: /order
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof OrderController
   */
  static async createOrder(req, res) {
    try {
      const orderDetails = ['meal', 'phoneNumber', 'address', 'drink', 'orderType'];
      const data = pick(req.body, orderDetails);

      data.userId = req.decoded.id;

      let orderCreated = await Order.create({ ...data, });
      
      if (orderCreated) {
        orderCreated = omit(orderCreated.dataValues, 'isDeleted');
        return res.status(201).json({
          success: true,
          message: 'Order created successfully',
          orderCreated,
        });
      }
    } catch (error) {
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res);
    }
  }
}

export default OrderController;
