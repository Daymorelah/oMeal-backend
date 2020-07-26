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

  /**
   * Get All Orders
   * Route: GET: /orders
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof OrderController
   */
  static async getAllOrders(req, res) {
    try {
      const { limit, offset, page, } = req.filter;
      const orders = await Order.findAndCountAll({
        limit, offset, where: { isDeleted: false, }, attributes: { exclude: ['isDeleted']
      }})
      if(orders) {
        const paginationMetaData = HelperMethods.getPaginationMetaData({ data: orders, limit, page, })
        return res.status(200).json({
          success: true,
          orders: orders.rows,
          paginationMetaData,
        });
      }
      return res.status(400).json({
        success: false,
        message: 'There are no orders available',
      });
    } catch (error) {
      console.log('error is ==> ', error);
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res);
    }
  }
}

export default OrderController;
