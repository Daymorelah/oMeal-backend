import { pick, omit } from 'lodash'
import Models from '../../models'
import HelperMethods from '../../helpers/helperMethods';

const { Menu, } = Models;

/**
 * Class representing the Menu controller
 * @class MenuController
 * @description menu controller
 */
class MenuController {
  /**
   * Get all menus
   * Route: GET: /menu
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof MenuController
   */
  static async getAllMenus(req, res) {
    try {
      const { limit, offset, page, } = req.filter;
      const menus = await Menu.findAndCountAll({
        limit, offset, where: { isDeleted: false, }, attributes: { exclude: ['isDeleted']
      }})
      if(menus) {
        const paginationMetaData = HelperMethods.getPaginationMetaData({ data: menus, limit, page, })
        return res.status(200).json({
          success: true,
          menus: menus.rows,
          paginationMetaData,
        });
      }
      return res.status(400).json({
        success: false,
        message: 'There are no menus available',
      });
    } catch (error) {
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res);
    }
  }

  /**
   * Get a menu
   * Route: GET: /menu/:id
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof MenuController
   */
  static async getAMenu(req, res) {
    try {
      const menu = await Menu.findByPk(req.params.id, { where: { isDeleted: false }, attributes: {exclude: ['isDeleted'] }});

      if (menu) {
        return res.status(200).json({
          success: true,
          menu,
        });
      }
      
      return res.status(400).json({
        success: false,
        message: 'The menu requested for does not exist',
      });
    } catch (error) {
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res);
    }
  }

  /**
   * Edit menu
   * Route: PATCH: /menu/
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof MenuController 
   */
  static async editMenu(req, res) {
    try {
      const menuFound = await Menu.findByPk(req.body.id);

      if(!menuFound) return res.status(400).json({
        success: false,
        message: 'Menu requested for to edit does not exist',
      });

      if(menuFound.userId !== req.decoded.id) {
        return res.status(403).json({
          success: false,
          message: 'You are forbidden to access this resource',
        });
      }

      const data = pick(req.body, ['name', 'prize', 'category'])

      let menuEdited = await menuFound.update(data, { returning: true })

      if(menuEdited) {
        menuEdited = omit(menuEdited.dataValues, 'isDeleted');
        return res.status(200).json({
          success: true,
          message: 'Menu edited successfully',
          menu: menuEdited,
        });
      }
    } catch (error) {
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res, error.message);
    }
  }

   /**
   * Create menu
   * Route: POST: /menu/
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof MenuController 
   */
  static async createMenu(req, res) {
    try {
      const menuDetails = ['name', 'prize', 'category'];
      const data = pick(req.body, menuDetails);
      data.userId = req.decoded.id;

      let menuCreated = await Menu.create({ ...data, });
      
      if (menuCreated) {
        menuCreated = omit(menuCreated.dataValues, 'isDeleted');
        return res.status(201).json({
          success: true,
          message: 'Menu created successfully',
          menuCreated,
        });
      }
    } catch (error) {
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res);
    }
  }
}

export default MenuController;
