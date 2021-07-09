import { omit, } from 'lodash'
import Models from '../../models'
import HelperMethods from '../../helpers/helperMethods';
import Authentication from '../../helpers/authentication';

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
    try {
      const { name, given_name, family_name, picture, email, email_verified, } = req.user._json;
      const userExist = await User.findOne({ where: { email: (email_verified && email) || null } });

      if (userExist) {
        const tokenCreated = await Authentication.generateSocialAuthToken({
          success: false,
          message: 'You are a registered user. Please login',
        });
        return res.redirect(
          `${process.env.CLIENT_REDIRECT_URL}/login?stat=${tokenCreated}`,
        );
      }

      const userCreated = await User.create({
        username: name || given_name || family_name,
        firstName: given_name || null,
        lastName: family_name || null,
        email: email,
        profilePicture: picture || null,
        password: `${name}${given_name}${family_name}`,
      });

      if (userCreated) {
        const userDetails = omit(userCreated.dataValues, ['password', 'isDeleted', 'email']);
        const token = await Authentication.getToken({
          id: userDetails.id,
          username: userDetails.username,
        });

        const tokenCreated = await Authentication.generateSocialAuthToken({
          id: userDetails.id,
          userDetails,
          success: true,
          message: 'Your signup process was successful.',
          token,
        });

        return res.redirect(
          `${process.env.CLIENT_REDIRECT_URL}/menu?stat=${tokenCreated}`,
        );
      }
    } catch (error) {
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res);
    }
  }
}

export default SocialAuth;
