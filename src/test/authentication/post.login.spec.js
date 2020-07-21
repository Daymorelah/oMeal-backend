import { expect } from 'chai'
import Request from 'supertest'
import app from '../../server';

const request = new Request(app)

describe('Post/login', () => {
  describe('Success', () => {
    it('should return 200 status when a user successfully logs in', done => {
      const userData = {
        password: 'password',
        email: 'demo2@demo.com',
      };
      request.post('/api/v1/auth/login')
        .send(userData)
        .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true);
          expect(res.body.userDetails.email).to.equal(userData.email)
          expect(res.body.userDetails).to.have.property('token');
          done();
        });
    });
  });
  describe('Failure', () => {
    it('should return 400 status when email is not present', done => {
      const incompleteUserData = {
        username: 'testUser',
        password: 'password',
      };
      request.post('/api/v1/auth/login')
        .send(incompleteUserData)
        .expect(400)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(false)
          expect(res.body.errors[0].email).to.equal('Email cannot be empty')
          done()
        })
    })

    it('should return 400 status when the user does not log in successfully', done => {
      const falseUserData = {
        email: 'test@email.com',
        password: 'passsword',
      };
      request.post('/api/v1/auth/login')
      .send(falseUserData)
      .expect(400)
      .end((err, res) => {
        if (err) { throw err }
        expect(res.body.success).to.equal(false)
        expect(res.body.message).to.equal("Email or password does not exist")
        done()
      });
    });
  });
});
