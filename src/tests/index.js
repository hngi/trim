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
