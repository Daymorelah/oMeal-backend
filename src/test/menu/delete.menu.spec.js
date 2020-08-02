import { expect } from 'chai'
import Request from 'supertest'
import app from '../../server';

const request = new Request(app)

describe('Delete/menu', () => {
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
    it('should delete a menu successfully', done => {
      request.patch('/api/v1/menu/archive')
        .set({ 'x-access-token': userToken })
        .send({ id: '6d213a10-bdde-40b5-92c6-1ffa980c933b', })
        .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true)
          expect(res.body.message).to.equal('Menu archived successfully')
          done()
        })
    })
  });
  describe('Failure', () => {
    it('should prevent an unauthorized user from deleting a menu', done => {
      request.patch('/api/v1/menu/archive')
        .set({ 'x-access-token': 'userToken' })
        .expect(401)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.message).to.equal('User not authorized')
          done()
        })
    });
    it('should not delete a menu when menu ID is invalid', done => {
      request.patch('/api/v1/menu/archive')
        .set({ 'x-access-token': userToken })
        .send({ id: '31acfdfc-f6ff-4c07-80cd-36a95376079', })
        .expect(400)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.errors[0]).to.have.property('id')
          expect(res.body.errors[0].id).to.equal('Menu Id is not valid')
          done()
        });
    });
    it('should prevent a registered user from deleting a menu not created by the user', done => {
      request.patch('/api/v1/menu/archive')
        .set({ 'x-access-token': userToken})
        .send({ id: '1446fda4-ac1f-4d33-be0c-07f4c6e68221', })
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
