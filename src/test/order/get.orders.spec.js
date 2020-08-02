import { expect } from 'chai'
import Request from 'supertest'
import app from '../../server';

const request = new Request(app)

describe('Get/orders', () => {
  let userToken = '';
  before('Login user', async () => {
    try {
      const res = await request.post('/api/v1/auth/login')
        .send({
          email: 'demo2@demo.com', password: 'password'
        })
        .expect(200)
      if (res) userToken = res.body.token
    } catch (err) {
      if (err) { throw err }
    }
  })
  describe('Success', () => {
    it('should return a paginated list of orders', done => {
      request.get('/api/v1/orders')
        .set({ 'x-access-token': userToken })
        .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true)
          expect(res.body).to.have.property('orders')
          expect(res.body).to.have.property('paginationMetaData')
          expect(res.body.paginationMetaData).to.have.property('totalData')
          expect(res.body.paginationMetaData).to.have.property('numberOfDataReturned')
          expect(res.body.paginationMetaData).to.have.property('currentPage')
          expect(res.body.paginationMetaData).to.have.property('numberOfPages')
          expect(res.body.orders[0]).not.to.have.property('isDeleted')
          done()
        })
    })
    it('should return limited data based on the limit query param', done => {
      request.get('/api/v1/orders?limit=2')
        .set({ 'x-access-token': userToken })
        .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true)
          expect(res.body).to.have.property('orders')
          expect(res.body).to.have.property('paginationMetaData')
          expect(res.body.paginationMetaData.numberOfDataReturned).to.equal(2)
          expect(res.body.orders[0]).not.to.have.property('isDeleted')
          done();
        });
    });
  });
  describe('Failure', () => {
    it('should prevent an unauthorized user', done => {
      request.get('/api/v1/orders')
        .set({ 'x-access-token': 'userToken' })
        .expect(401)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.message).to.equal('User not authorized')
          done()
        })
    });
  });
});
