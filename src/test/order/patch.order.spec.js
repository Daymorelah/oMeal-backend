import { expect } from 'chai'
import Request from 'supertest'
import app from '../../server';

const request = new Request(app)

describe('Patch/order', () => {
  let userToken = '';
  before('Login user', async () => {
    try {
      const res = await request.post('/api/v1/auth/login')
        .send({
          email: 'demo3@demo.com', password: 'password'
        })
        .expect(200)
      if (res) userToken = res.body.userDetails.token
    } catch (err) {
      if (err) { throw err }
    }
  });
  describe('Success', () => {
    it('should edit an order successfully', done => {
      const orderData = {
        id: 'd25eb545-718c-415b-bf7a-1820acc44fe1',
        address: 'No. 6 oluwo street, Ishaga, Lagos',
      };
      request.patch('/api/v1/order')
        .set({ 'x-access-token': userToken })
        .send(orderData)
        .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true)
          expect(res.body.message).to.equal('Order edited successfully')
          expect(res.body).to.have.property('order')
          expect(res.body.order.address).to.equal('No. 6 oluwo street, Ishaga, Lagos')
          done()
        })
    })
  });
  describe('Failure', () => {
    it('should prevent an unauthorized user from editing an order', done => {
      request.patch('/api/v1/order')
        .set({ 'x-access-token': 'userToken' })
        .send({})
        .expect(401)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.message).to.equal('User not authorized')
          done()
        })
    });
    it('should not edit an order when an order Id is missing', done => {
      const orderData = {
        phoneNumber: '07032958177',
      };
      request.patch('/api/v1/order')
        .set({ 'x-access-token': userToken })
        .send(orderData)
        .expect(400)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.errors[0]).to.have.property('id')
          expect(res.body.errors[0].id).to.equal('The id field is required')
          done()
        });
    });
    it('should prevent a registered user from editing an order not created by the user', done => {
      request.patch('/api/v1/order')
        .set({ 'x-access-token': userToken })
        .send({ id: 'dafc552a-6002-44af-ad6b-84ac38655ebd' })
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
