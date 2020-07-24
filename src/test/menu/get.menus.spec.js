import { expect } from 'chai'
import Request from 'supertest'
import app from '../../server';

const request = new Request(app)

describe('Get/menus', () => {
  describe('Success', () => {
    it('should return all menus (paginated)', done => {
      request.get('/api/v1/menus')
      .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true);
          expect(res.body).to.have.property('menus');
          expect(res.body).to.have.property('paginationMetaData');
          expect(res.body.paginationMetaData).to.have.property('totalData')
          expect(res.body.paginationMetaData).to.have.property('numberOfDataReturned')
          expect(res.body.paginationMetaData).to.have.property('currentPage')
          expect(res.body.paginationMetaData).to.have.property('numberOfPages')
          expect(res.body.menus[0]).not.to.have.property('isDeleted')
          
          done();
        });
    });
    it('should return limited data based on the limit query param', done => {
      request.get('/api/v1/menus?limit=2')
        .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          expect(res.body.success).to.equal(true)
          expect(res.body).to.have.property('menus')
          expect(res.body).to.have.property('paginationMetaData')
          expect(res.body.paginationMetaData.numberOfDataReturned).to.equal(2)
          expect(res.body.menus[0]).not.to.have.property('isDeleted')
          done();
        });
    });
  });
});
