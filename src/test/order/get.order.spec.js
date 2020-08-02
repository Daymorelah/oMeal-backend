import { expect } from 'chai'
import Request from 'supertest'
import app from '../../server';

const request = new Request(app)

describe('Get/order', () => {
  let userToken = '';
  before('Login user', async () => {
    try {
      const res = await request.post('/api/v1/auth/login')
        .send({
          email: 'demo3@demo.com', password: 'password'
        })
        .expect(200)
      if (res) userToken = res.body.token
    } catch (err) {
      if (err) { throw err }
    }
  })
  describe('Success', () => {
    it('should return an event', done => {
      request.get('/api/v1/order/d25eb545-718c-415b-bf7a-1820acc44fe1')
        .set({ 'x-access-token': userToken })
        .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true)
          expect(res.body).to.have.property('order')
          expect(res.body.order).not.to.have.property('isDeleted')
          done()
        })
    });
  });
  describe('Failure', () => {
    it('should prevent an unauthorized user', done => {
      request.get('/api/v1/order/31acfdfc-f6ff')
        .set({ 'x-access-token': 'userToken' })
        .expect(401)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.message).to.equal('User not authorized')
          done()
        })
    });
    it('should return invalid ID when an invalid order ID is sent', done => {
      request.get('/api/v1/order/23ewr67-w34gf')
        .set({ 'x-access-token': userToken })
        .expect(400)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.errors[0]).to.have.property('id')
          expect(res.body.errors[0].id).to.equal('Order Id is not valid')
          done()
        })
    });
    it('should return bad request when order ID does not exist', done => {
      request.get('/api/v1/order/31acfdfc-f6ff-aa2a-bbbb-36a607959537')
        .set({ 'x-access-token': userToken })
        .expect(400)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('The order requested for does not exist')
          done()
        })
    });
    it('should prevent a registered user from viewing an order not created by the user', done => {
      request.get('/api/v1/order/b9bdc5ad-fc9f-4d0d-86b5-40707dd649a0')
        .set({ 'x-access-token': userToken})
        .expect(403)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.message).to.equal("You are forbidden to access this resource")
          done();
        });
    });
  });
});
