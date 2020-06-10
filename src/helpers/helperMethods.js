
import { validationResult, } from 'express-validator';

/**
 * Class representing the helper methods
 * @class HelperMethods
 * @description methods used everywhere in the codebase
 */
class HelperMethods {
  /**
   * A method used to send server errors
   * @param {object} res - HTTP response object
   * @param {String} message - The error message you want to set.
   * @returns {object} res - The HTTP response object
   */
  static serverError(res, message) {
    return res.status(500).json({
      success: false,
      message: message || 'Internal server error',
    });
  }

  /**
   * A method used to send client-side errors
   * @param {object} res - HTTP response object
   * @param {String} message - The error message you want to set.
   * @param {number} status = Status code of the client error
   * @returns {object} res - The HTTP response object
   */
  static clientError(res, message, status = 400) {
    return res.status(status).json({
      success: false,
      message,
    });
  }

  /* eslint-enable no-useless-escape */
  /**
   * @param {object} err - error object
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request to the next handler
   * @returns {object} res - Response object when query is invalid
   * @memberof HelperMethods
   */
  static checkExpressErrors(err, req, res, next) {
    res.status(500).json({
      message: 'Something failed',
      success: false
    });
    return next();
  }

  /**
   * A method used to send sequelize validation error
   * @param {object} res - HTTP response object
   * @param {object} error - The error object from sequelize.
   * @returns {object} res - The HTTP response object
   */
  static sequelizeErrorHandler(err, res) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({
        status: 422,
        message: 'An error occurred validating your request',
        errors: err.errors.map(error => ({
          field: error.path,
          message: error.message,
          location: 'database'
        })),
      })
    }
  
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(422).json({
        status: 422,
        message: 'An error occurred foreign Key constraint',
        errors: {
          field: err.path,
          message: err.parent.detail,
          location: err.parent.table
        }
      })
    }
    
    if (err.name === 'SequelizeDatabaseError') {
      return res.status(422).json({
        status: 422,
        message: 'An error occurred foreign Key constraint',
        errors: {
          field: err.path,
          message: err.parent.detail,
          location: err.parent.table
        }
      })
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

  /**
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request to the next handler
   * @returns {object} res - Response object when query is invalid
   * @memberof HelperMethods
   */
  static validateMiddleware (req, res, next) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(400).json({
      success: false,
      errors: extractedErrors,
    })
  }

  /**
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request to the next handler
   * @returns {object} res - Response object when query is invalid
   * @memberof HelperMethods
   */
  static paginateMiddleware (req, res, next) {
    const { limit, page } = req.query;
    const maximumLimit = 100;
    const calculatedLimit = (parseInt(limit, 10) > maximumLimit ? maximumLimit : parseInt(limit, 10)) || maximumLimit;
    const currentPage = parseInt(page, 10) || 1;
    const calculatedOffset = calculatedLimit * (currentPage - 1);
    req.filter = {
      limit: calculatedLimit,
      offset: calculatedOffset,
      page: currentPage,
    };
    return next();
  }

  /**
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request to the next handler
   * @returns {object} res - Response object when query is invalid
   * @memberof HelperMethods
   */
  static getPaginationMetaData (payload) {
    const { data, limit, page, } = payload;
    const numberOfPages = Math.ceil(data.count / limit);
    return ({
      totalData: data.count,
      numberOfDataReturned: data.rows.length,
      currentPage: page,
      numberOfPages,
    });
  }
}

export default HelperMethods;
