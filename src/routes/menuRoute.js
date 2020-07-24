import HelperMethods from '../helpers/helperMethods';
import MenuController from '../controllers/menu';
import { validateGetAMenu, } from '../middleware/menu';

const menuRoutes = app => {
  app.get(
    '/api/v1/menus',
    HelperMethods.paginateMiddleware,
    MenuController.getAllMenus,
  );
  app.get(
    '/api/v1/menu/:id',
    validateGetAMenu(),
    HelperMethods.validateMiddleware,
    MenuController.getAMenu,
  );
};

export default menuRoutes;
