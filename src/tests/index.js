import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';
import UrlShorten from "../models/UrlShorten";




chai.use(chaiHttp);
chai.should()

const {
  expect
} = chai;

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
