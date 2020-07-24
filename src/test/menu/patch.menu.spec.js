import { expect } from 'chai'
import Request from 'supertest'
import app from '../../server';

const request = new Request(app)

describe('Patch/menu', () => {
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
    it('should edit a menu successfully', done => {
      const menuData = {
        id: '1446fda4-ac1f-4d33-be0c-07f4c6e68221',
        name: 'Cup cake',
      };
      request.patch('/api/v1/menu')
        .set({ 'x-access-token': userToken })
        .send(menuData)
        .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true)
          expect(res.body.message).to.equal('Menu edited successfully')
          expect(res.body).to.have.property('menu')
          expect(res.body.menu.name).to.equal('Cup cake')
          done()
        })
    })
  });
  describe('Failure', () => {
    it('should prevent an unauthorized user from editing a menu', done => {
      request.patch('/api/v1/menu')
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
    it('should not edit a menu when menu ID is missing', done => {
      const eventData = {
        name: 'password',
      };
      request.patch('/api/v1/menu')
        .set({ 'x-access-token': userToken })
        .send(eventData)
        .expect(400)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.errors[0]).to.have.property('id')
          expect(res.body.errors[0].id).to.equal('The id field is required')
          done()
        });
    });
    it('should prevent a registered user from editing a menu not created by the user', done => {
      request.patch('/api/v1/menu')
        .set({ 'x-access-token': userToken })
        .send({ id: '4d20722d-f760-4cc2-8304-bc5f5c41ccec' })
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
