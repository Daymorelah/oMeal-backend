import { expect } from 'chai'
import Request from 'supertest'
import app from '../../server';

const request = new Request(app)

describe('Post/Order', () => {
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
    it('should create an order successfully', done => {
      const orderData = {
        meal: '[{"menuId":"567bbf5a-5ca6-418c-a03c-0f58ca6c6ae3","quantity":2,"price":1200,"name":"Jollof Rice and chicken"}]',
        drink: '[{"menuId":"9982a44b-0b63-4cc5-baa5-9ae8797deda2","quantity":2,"price":1300,"name":"Hollandia Yoghurt"}]',
        address: 'No. 16 abadan street, off ojo road, Egbeda, Lagos',
        phoneNumber: '+2348172384539',
        orderType: 'pick-up'
      };
      request.post('/api/v1/order')
        .set({ 'x-access-token': userToken })
        .send(orderData)
        .expect(201)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true)
          expect(res.body.message).to.equal('Order created successfully')
          expect(res.body).to.have.property('orderCreated')
          expect(res.body.orderCreated).not.to.have.property('isDeleted')
          done()
        })
    })
  });
  describe('Failure', () => {
    it('should prevent an unauthorized user', done => {
      request.post('/api/v1/order')
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
    it('should not create an order with incomplete details', done => {
      const orderData = {
        address: 'No. 16 abadan street, off ojo road, Egbeda, Lagos',
        phoneNumber: '+2348172384539',
        orderType: 'pick-up'
      };
      request.post('/api/v1/order')
        .set({ 'x-access-token': userToken })
        .send(orderData)
        .expect(400)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.errors[0]).to.have.property('meal')
          expect(res.body.errors[0].meal).to.equal('The meal field is required')
          done()
        });
    });
  });
});
