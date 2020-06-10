import { pick, omit, } from 'lodash'
import Models from '../../models'
import HelperMethods from '../../helpers/helperMethods';
import Authentication from '../../helpers/authentication';

const { User, } = Models;

/**
 * Class representing the Auth controller
 * @class AuthController
 * @description auth controller
 */
class AuthController {
  /**
   * Sign up a user
   * Route: POST: /auth/signup
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof AuthController
   */
  static async signUp(req, res) {
    try {
      const reqBody = pick(req.body, ['email', 'username', 'password']);

      const userExist = await User.findOne({ where: { email: reqBody.email } });

      if (userExist) {
        return res.status(409).json({
          success: false,
          message: 'User already exists. Please proceed to login'
        });
      }
      const userCreated = await User.create({ ...reqBody, });
      
      if (userCreated) {
        const userDetails = omit(userCreated.dataValues, ['password', 'isDeleted'])
        const tokenCreated = await Authentication.getToken({
          id: userDetails.id,
          username: userDetails.username,
        });
  
        return res.status(201).json({
          success: true,
          userDetails,
          token: tokenCreated,
        });
      }
    } catch (error) {
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res);
    }
  }
}

export default AuthController;
