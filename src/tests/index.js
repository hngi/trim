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
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.equal(true);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

describe('Error', () => {
  it('it should send a 404 error on GET on nonexistent route', (done) => {
    chai.request(app)
      .get('/happy')
      .end((error, res) => {
        expect(res).to.have.status(404);
        expect(res).to.have.property('body');
        expect(res.body).to.equal('Page not found');
        done();
      });
  });

  it('it should send a 404 error on POST on nonexistent route', (done) => {
    chai.request(app)
      .post('/sad')
      .end((error, res) => {
        expect(res).to.have.status(404);
        expect(res).to.have.property('body');
        expect(res.body).to.equal('Page not found');
        done();
      });
  });
});
