import { expect } from 'chai'
import Request from 'supertest'
import app from '../../server';

const request = new Request(app)

describe('Post/signup', () => {
  describe('Success', () => {
    it('should return 201 status when a user is successfully created', done => {
      const userData = {
        username: 'testUser',
        password: 'password',
        email: 'test@email.com',
      };
      request.post('/api/v1/auth/signup')
        .send(userData)
        .expect(201)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.userDetails.email).to.equal(userData.email)
          expect(res.body.userDetails.username).to.equal(userData.username)
          expect(res.body).to.have.property('token');
          done();
        });
    });
  })
  describe('Failure', () => {
    it('should return 400 status when the user is not successfully created', done => {
      const incompleteUserData = {
        username: 'testUser',
        password: 'password',
      };
      request.post('/api/v1/auth/signup')
        .send(incompleteUserData)
        .expect(400)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.errors[0].email).to.equal('Email cannot be empty')
          done()
        })
    })

    it('should return 409 status if the user email already exists', done => {
      const userData = {
        username: 'testUser',
        password: 'password',
        email: 'test@email.com',
      };
      request.post('/api/v1/auth/signup')
        .send(userData)
        .expect(409)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.message).to.equal('User already exists. Please proceed to login')
          expect(res.body.success).to.equal(false);
          done()
        })
    })
  })
})
