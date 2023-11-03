const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server'); // Import your Express app
const expect = chai.expect;
const jwt = require('jsonwebtoken');
const app = require('./server'); // Import your Express app

chai.use(chaiHttp);

describe('/add-product', () => {
  it('should add a product when the user is authenticated and has admin role', (done) => {
    // Create a JWT token for an admin user
    const token = jwt.sign({ role: 'admin' }, 'your-secret-key');
    
    chai.request(app)
      .post('/add-product')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Sample Product' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Product added');
        done();
      });
  });

  it('should return an error when the user is not authenticated', (done) => {
    chai.request(app)
      .post('/add-product')
      .send({ name: 'Sample Product' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Unauthorized');
        done();
      });
  });
});
