import { expect } from 'chai'
import Request from 'supertest'
import app from '../../server';

const request = new Request(app)

describe('Post/menu', () => {
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
    it('should create a menu successfully', done => {
      const menuData = {
        name: 'Yam',
        category: 'meal',
        prize: '400',
      };
      request.post('/api/v1/menu')
        .set({ 'x-access-token': userToken })
        .send(menuData)
        .expect(201)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true)
          expect(res.body.message).to.equal('Menu created successfully')
          expect(res.body).to.have.property('menuCreated')
          expect(res.body.menuCreated).not.to.have.property('isDeleted')
          done()
        })
    })
  });
  describe('Failure', () => {
    it('should prevent an unauthorized user', done => {
      request.post('/api/v1/menu')
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
    it('should not create a menu with incomplete details', done => {
      const eventData = {
        name: 'password',
        prize: '300',
      };
      request.post('/api/v1/menu')
        .set({ 'x-access-token': userToken })
        .send(eventData)
        .expect(400)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.errors[0]).to.have.property('category')
          expect(res.body.errors[0].category).to.equal('The category field is required')
          done()
        });
    });
  });
});
