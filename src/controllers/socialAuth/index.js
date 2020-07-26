import Models from '../../models'
import HelperMethods from '../../helpers/helperMethods';

const { User, } = Models;

/**
 * Class representing the Social Auth controller
 * @class SocialAuthController
 * @description social controller
 */
class SocialAuth {
  /**
   * Google Signup
   * Route: GET: /auth/google/callback
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof SocialAuth
   */
  static async googleSignup(req, res) {
    console.log('it entered social');
  try {
    res.redirect(`${process.env.CLIENT_REDIRECT_URL}/menu`,)
  } catch (error) {
    if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
    return HelperMethods.serverError(res);
  }
  }
}

export default SocialAuth;
