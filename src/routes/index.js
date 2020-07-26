import authRoute from './authRoute';
import menuRoute from './menuRoute';
import orderRoute from './orderRoute';

/**
 * Handles request
 * @param {object} app - An instance of the express module
 * @returns {object} - An object containing all routes
 */
const routes = app => {
  app.get('/', (req, res) => res.redirect('/api/v1/'))
  app.get('/api/v1/', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Welcome to the OMeal API'
    });
  });
  authRoute(app);
  menuRoute(app);
  orderRoute(app);
};

export default routes;
