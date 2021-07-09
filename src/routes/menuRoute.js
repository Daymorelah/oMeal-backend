import HelperMethods from '../helpers/helperMethods';
import MenuController from '../controllers/menu';
import Authorization from '../middleware/authorization';
import { validateGetAMenu, validateEditMenu, validateCreateMenu, validateDeleteMenu, } from '../middleware/menu';

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
  app.post(
    '/api/v1/menu',
    Authorization.checkToken,
    validateCreateMenu(),
    HelperMethods.validateMiddleware,
    MenuController.createMenu,
  );
  app.patch(
    '/api/v1/menu/archive',
    Authorization.checkToken,
    validateDeleteMenu(),
    HelperMethods.validateMiddleware,
    MenuController.deleteMenu,
  );
};

export default menuRoutes;
