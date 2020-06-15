import sinon from 'sinon';
import chai from 'chai';
import HelperMethods from '../helpers/helperMethods';
import Authentication from '../helpers/authentication';
import Authorization from '../middleware/authorization';

const { expect } = chai;

const res = {
  status() { return this; },
  json(obj) { return obj; }
};

const req = {
  query: { limit: 200, page: 3, token: 'weve#$53rfcvdfv'}
}

const next = () => true;

const error = {
  path: 'some error path',
  errors: [{path: 'my error path'}, {message: 'my error message'}],
  parent: {detail: 'my error detail', table: 'my error table'}
}
describe('Unit tests for helper methods', () => {

  it('should send an "Internal server error" message', () => {
    const response = HelperMethods.serverError(res);
    expect(response).to.have.property('message');
    expect(response).to.have.property('success');
    expect(response.success).to.equal(false);
    expect(response.message).to.equal('Internal server error');
  });

  it('should return 400 status code and the error '
    + 'message when "clientError" method is called', () => {
    const response = HelperMethods.clientError(res, 'custom client error message');
    expect(response).to.have.property('message');
    expect(response).to.have.property('success');
    expect(response.success).to.equal(false);
    expect(response.message).to.equal('custom client error message');
  });

  it('should return 400 status code and the error '
    + 'message when "checkExpressErrors" method is called', () => {
    const response = HelperMethods.checkExpressErrors(null, null, res, next);
    expect(response).to.equal(true);
  });

  it('should return 400 status code and the error '
    + 'message when "paginateMiddleware" method is called', () => {
    const response = HelperMethods.paginateMiddleware(req, res, next);
    expect(response).to.equal(true);
  });

  it('should return 422 status code and the error '
  + 'message when "SequelizeValidationError" error is caught', () => {
    error.name = 'SequelizeValidationError';
    error.errors = [{message: 'An error occurred validating your request'}];
    const response = HelperMethods.sequelizeErrorHandler(error, res);
    expect(response).to.have.property('message');
    expect(response).to.have.property('status');
    expect(response.status).to.equal(422);
    expect(response.message).to.equal('An error occurred validating your request'); 
  });

  it('should return 422 status code and the error '
  + 'message when "SequelizeForeignKeyConstraintError" error is caught', () => {
    error.name = 'SequelizeForeignKeyConstraintError';
    error.errors = [{message: 'An error occurred foreign Key constraint'}];
    const response = HelperMethods.sequelizeErrorHandler(error, res);
    expect(response).to.have.property('message');
    expect(response).to.have.property('status');
    expect(response.status).to.equal(422);
    expect(response.message).to.equal('An error occurred foreign Key constraint'); 
  });
  
  it('should return 422 status code and the error '
  + 'message when "SequelizeDatabaseError" error is caught', () => {
    error.name = 'SequelizeDatabaseError';
    error.errors = [{message: 'An error occurred foreign Key constraint'}];
    const response = HelperMethods.sequelizeErrorHandler(error, res);
    expect(response).to.have.property('message');
    expect(response).to.have.property('status');
    expect(response.status).to.equal(422);
    expect(response.message).to.equal('An error occurred foreign Key constraint'); 
  });
  
  describe('Unit test for the token verification method', () => {
    let stubbedMethod;
  
    afterEach(() => {
      if (stubbedMethod.restore) stubbedMethod.restore();
    });
    it('should use token in the request query if token is not found in the header', async () => {
      req.headers = { 'x-access-token': null };
      stubbedMethod = sinon
        .stub(Authentication, 'verifyToken')
        .returns({
          success: true,
          message: 'token found in query'
        });
      await Authorization.checkToken(req, res, next);
      expect(req.decoded.message).to.equal('token found in query');
    });

    it('should use token in the request body if token is not found in the header or in the query', async () => {
      req.headers = { 'x-access-token': null }
      req.query = { token: null };
      req.body = { token: 'er4#$Er4%$#r4#' };
      stubbedMethod = sinon
        .stub(Authentication, 'verifyToken')
        .returns({
          success: true,
          message: 'token found in body'
        });
      await Authorization.checkToken(req, res, next);
      expect(req.decoded.message).to.equal('token found in body');
    });
  });
});
