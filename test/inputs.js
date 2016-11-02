const chai = require('chai');
const expect = chai.expect;
const inputService = require('../public/js/services');

describe('Input Service', () => {
  it('should bind inputs correctly', (done) => {
    const user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save((err) => {
      expect(err).to.be.null;
      expect(user.email).to.equal('test@gmail.com');
      expect(user).to.have.property('createdAt');
      expect(user).to.have.property('updatedAt');
      done();
    });
  });
