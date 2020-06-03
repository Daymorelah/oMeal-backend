/**
 * Handles request
 * @param {object} app - An instance of the express module
 * @returns {object} - An object containing all routes
 */
const routes = app => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Welcome to the O-Meal API'
    });
  });
};

export default routes;
