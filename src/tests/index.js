import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Home page', () => {
  it('it should take users to the landing page', (done) => {
    chai.request(app)
      .get('/')
      .end((error, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('GET by id', () => {
  it('should give an error', (done) => {
    const _id = "5d97a53e7d948138c8a32920";
    chai.request(app)
    .get(`/${_id}`)
    .end((err, res) => {
      expect(res).to.have.status(404)
      done();
    })
  })
})

describe('GET wrong route', () => {
  it('should give an error', (done) => {
    chai.request(app)
    .get('/*')
    .end((err, res) => {
      expect(res).to.have.status(404)
      done();
    })
  })
})
