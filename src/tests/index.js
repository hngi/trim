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


describe('URL', () => {
  beforeEach((done) => { //Before each test we empty the database
    UrlShorten.remove({}, (err) => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe('/GET Url', () => {
    it('it should GET all the Urls', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.a('object')
          done();
        });
    });
  });

  describe('/GET/:id newTrim', () => {
    it('it should give an error', (done) => {
      const id = "1";
      chai.request(app)
        .get(`/${id}`)
        .end((err, res) => {
          expect(res).to.have.status(404)
          done();
        })
    })
  })


})