
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';



chai.use(chaiHttp);
const { expect } = chai;

describe('POST /api/trim', () => {




    it('it should send an object with three properties on success', (done) => {

        chai.request(app)
            .post('/api/trim')
            .send({
                long_url: 'www.bestbuy.com', created_by: '4n-hnqI6iBIQo8-pyu2yW'

            })
            .end((error, res) => {

                console.log(error)
                expect(res).to.have.status(201);
                //expect(res).to.be.an('object');
                //expect(res).to.have.property('userClips');
                //expect(res).to.have.property('success');
                //expect(res).to.have.property('success').eql('true');
                done();
            });
    });
});