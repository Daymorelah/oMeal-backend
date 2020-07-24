import HelperMethods from '../helpers/helperMethods';
import MenuController from '../controllers/menu';
import Authorization from '../middleware/authorization';
import { validateGetAMenu, validateEditMenu, } from '../middleware/menu';

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
  app.patch(
    '/api/v1/menu',
    Authorization.checkToken,
    validateEditMenu(),
    HelperMethods.validateMiddleware,
    MenuController.editMenu,
  );
};

export default menuRoutes;
