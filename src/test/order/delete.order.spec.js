import { expect } from 'chai'
import Request from 'supertest'
import app from '../../server';

const request = new Request(app)

describe('Delete/order', () => {
  let userToken = '';
  before('Login user', async () => {
    try {
      const res = await request.post('/api/v1/auth/login')
        .send({
          email: 'demo2@demo.com', password: 'password'
        })
        .expect(200)
      if (res) userToken = res.body.userDetails.token
    } catch (err) {
      if (err) { throw err }
    }
  })
  describe('Success', () => {
    it('should delete an order successfully', done => {
      request.patch('/api/v1/order/archive')
        .set({ 'x-access-token': userToken })
        .send({ id: 'b9bdc5ad-fc9f-4d0d-86b5-40707dd649a0', })
        .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true)
          expect(res.body.message).to.equal('Order archived successfully')
          done()
        })
    })
  });
  describe('Failure', () => {
    it('should prevent an unauthorized user from deleting an order', done => {
      request.patch('/api/v1/order/archive')
        .set({ 'x-access-token': 'userToken' })
        .expect(401)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.message).to.equal('User not authorized')
          done()
        })
    });
    it('should not delete an order when order Id is invalid', done => {
      request.patch('/api/v1/order/archive')
        .set({ 'x-access-token': userToken })
        .send({ id: '31acfdfc-f6ff-4c07-80cd-36a95376079', })
        .expect(400)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.errors[0]).to.have.property('id')
          expect(res.body.errors[0].id).to.equal('Order Id is not valid')
          done()
        });
    });
    it('should prevent a registered user from deleting an order not created by the user', done => {
      request.patch('/api/v1/order/archive')
        .set({ 'x-access-token': userToken})
        .send({ id: '6426c0c1-0570-45a9-a2c6-69a766572429', })
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
