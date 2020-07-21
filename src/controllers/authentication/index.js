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
  /**
   * login a user
   * Route: POST: /auth/login
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof AuthController
   */
  static async login(req, res) {
    try {
      const { email, password, } = req.body;
      let userFound = await User.findOne({ where: { email }});
      
      if (!userFound) {
        return HelperMethods.clientError(res, 'Email or password does not exist', 400);
      }

      const isPasswordValid = await userFound.verifyPassword(password);

      if (userFound && isPasswordValid) {
        const userDetails = omit(userFound.dataValues, ['password', 'isDeleted'])
        
        const tokenCreated = await Authentication.getToken({
          id: userDetails.id,
          username: userDetails.username,
        });
        
        if (tokenCreated) {
          userDetails.token = tokenCreated;
          return res.status(200).json({
            success: true,
            message: 'Login successful',
            userDetails,
          });
        }
      }
    } catch (error) {
      if (error.name) return HelperMethods.sequelizeErrorHandler(error, res);
      return HelperMethods.serverError(res);
    }
  }
}

export default AuthController;
