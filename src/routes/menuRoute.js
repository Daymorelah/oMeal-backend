// import Authorization from '../middleware/authorization';
import HelperMethods from '../helpers/helperMethods';
import MenuController from '../controllers/menu';

const menuRoutes = app => {
  app.get(
    '/api/v1/menus',
    HelperMethods.paginateMiddleware,
    MenuController.getAllMenus,
  );
};

export default menuRoutes;
