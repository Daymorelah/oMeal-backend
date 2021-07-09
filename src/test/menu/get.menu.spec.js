import { expect } from 'chai'
import Request from 'supertest'
import app from '../../server';

const request = new Request(app)

describe('Get/menu', () => {
  describe('Success', () => {
    it('should return menu specified by id in param', done => {
      request.get('/api/v1/menu/567bbf5a-5ca6-418c-a03c-0f58ca6c6ae3')
      .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true);
          expect(res.body).to.have.property('menu');
          expect(res.body.menu).not.to.have.property('isDeleted')
          done();
        });
    });
  });
  describe('Failure', () => {
    it('should return invalid ID when an invalid event ID is sent', done => {
      request.get('/api/v1/menu/23ewr67-w34gf')
      .expect(400)
      .end((err, res) => {
        if (err) { throw err }
        expect(res.body.success).to.equal(false)
        expect(res.body.errors[0]).to.have.property('id')
        expect(res.body.errors[0].id).to.equal('Menu Id is not valid')
        done()
      })
    });
    it('should return bad request when menu ID does not exist', done => {
      request.get('/api/v1/menu/31acfdfc-f6ff-aa2a-bbbb-36a607959537')
      .expect(400)
      .end((err, res) => {
        if (err) { throw err }
        expect(res.body.success).to.equal(false)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('The menu requested for does not exist')
        done()
      })
    });
  });
});
