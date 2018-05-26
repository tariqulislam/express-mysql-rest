process.env.NODE_ENV = "test"

const User = require('../db/models').User;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp)


describe('/GET user', () => {
    it('it should Get all users', (done) => {
        chai.request(app)
        .get('/api/users')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/POST user', () => {
    it('it sould post the user info', (done) => {
        const user = {
            firstName: " Husne Ara",
            lastName: "Asma",
            email: "asma@gmail.com"
        };

        chai.request(app)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('message');
            res.body.should.have.property('statusType').eq('success');
            done();
        });
    });
});


describe('/PUT/:id user', () => {
    it("should not update the user info", (done) => {
        const user = {
            firstName: "Mr.",
            lastName: "Himu",
        }
        const userId = 2;

         chai.request(app)
         .put('/api/users/'+ userId)
         .send(user)
         .end((err, res) => {
             res.should.have.status(404);
             res.body.should.be.a('object');
             res.body.should.have.property('message');
             res.body.should.have.property('statusType').eq('error');
             done();
         });
    });
});