import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST URL', () => {
  it('it create a new url', (done) => {
    chai.request(app)
      .post('/')
      .set('Cookie', 'userID=4n-hnqI6iBIQo8-pyu2yW')
      .send({ long_url: 'www.google.com', created_by: '4n-hnqI6iBIQo8-pyu2yW' })
      .end((error, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});
