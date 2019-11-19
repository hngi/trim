import chaiHttp from "chai-http";
import chai from "chai";
import app from "../index";
import UrlShorten from "../models/UrlShorten";
import { DOMAIN_NAME, SAMPLE_COOKIE } from "../config/constants";

chai.use(chaiHttp);
const { expect } = chai;
let clips = {};

describe("TRIM POST /", () => {
  before( () => {
    return new Promise(function (resolve) {
      UrlShorten.deleteOne({ long_url: 'www.google.com' })
        .then(function (result) {
          resolve();
        });
    });
  });
  it("it create a new url", done => {
    chai
      .request(app)
      .post("/")
      .set("Cookie", `userID=${SAMPLE_COOKIE}`)
      .send({ long_url: "www.google.com", created_by: SAMPLE_COOKIE })
      .end((error, res) => {
        expect(res).to.have.status(201);
        clips = res.body.clips;
        done();
      });
  });

  it("it not create a new url with invalid url address", done => {
    chai
      .request(app)
      .post("/")
      .set("Cookie", `userID=${SAMPLE_COOKIE}`)
      .send({ long_url: "wwwcom", created_by: SAMPLE_COOKIE })
      .end((error, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("it not create a new url if url is own domain", done => {
    chai
      .request(app)
      .post("/")
      .set("Cookie", `userID=${SAMPLE_COOKIE}`)
      .send({
        long_url: `${DOMAIN_NAME}/index.html`,
        created_by: SAMPLE_COOKIE
      })
      .end((error, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("it not create a new url if it already exists", done => {
    chai
      .request(app)
      .post("/")
      .set("Cookie", `userID=${SAMPLE_COOKIE}`)
      .send({ long_url: "www.google.com", created_by: SAMPLE_COOKIE })
      .end((error, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
});

describe("GET /", () => {
  /*
   * Test the /GET route
   */
  it("it should GET all the Urls", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("it should give an error if url not found", done => {
    const id = "17867567576";
    chai
      .request(app)
      .get(`/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  // it('it should redirect to original website', (done) => {
  //   const id = "17867567576";
  //   chai.request(app)
  //     .get(`/${clips[0].urlCode}`)
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       done();
  //     });
  // });
});
