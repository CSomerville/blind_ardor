var expect = chai.expect;

describe('this is a form of hello', function(){
  it('should recognize itself in itself', function(){
    expect('hello').to.equal('hello');
  });
});