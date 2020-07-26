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
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res);
    }
  }

  /**
   * Get an Order
   * Route: GET: /order/:id
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof OrderController
   */
  static async getAnOrder(req, res) {
    try {
      const order = await Order.findByPk(req.params.id, { where: { isDeleted: false }, attributes: {exclude: ['isDeleted'] }});
      
      if(!order) {
        return res.status(400).json({
          success: false,
          message: 'The order requested for does not exist',
        });
      }

      if(order.userId !== req.decoded.id) {
        return res.status(403).json({
          success: false,
          message: 'You are forbidden to access this resource',
        });
      }

      if (order) {
        return res.status(200).json({
          success: true,
          order,
        });
      }
      
    } catch (error) {
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res);
    }
  }

  /**
   * Edit order
   * Route: PATCH: /order
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof OrderController 
   */
  static async editAnOrder(req, res) {
    try {
      const orderFound = await Order.findByPk(req.body.id);

      if(!orderFound || orderFound.isDeleted) return res.status(400).json({
        success: false,
        message: 'Order requested for to edit does not exist',
      });

      if(orderFound.userId !== req.decoded.id) {
        return res.status(403).json({
          success: false,
          message: 'You are forbidden to access this resource',
        });
      }

      const data = pick(req.body, ['meal', 'drink', 'address', 'orderType', 'phoneNumber'])

      let orderEdited = await orderFound.update(data, { returning: true })

      if(orderEdited) {
        orderEdited = omit(orderEdited.dataValues, 'isDeleted');
        return res.status(200).json({
          success: true,
          message: 'Order edited successfully',
          order: orderEdited,
        });
      }
    } catch (error) {
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res, error.message);
    }
  }

   /**
   * Delete order
   * Route: PATCH: /order/archive
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof OrderController 
   */
  static async deleteOrder(req, res) {
    try {
      const orderFound = await Order.findByPk(req.body.id);

      if(!orderFound || orderFound.isDeleted) return res.status(400).json({
        success: false,
        message: 'Order requested for does not exist',
      });
      
      if(orderFound.userId !== req.decoded.id) {
        return res.status(403).json({
          success: false,
          message: 'You are forbidden to access this resource',
        });
      }
      
      const orderEdited = await orderFound.update({ isDeleted: true, })

      if(orderEdited) {
        return res.status(200).json({
          success: true,
          message: 'Order archived successfully',
        });
      }
    } catch (error) {
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res);
    }
  }
}

export default OrderController;
