var expect = chai.expect;

describe('the dependencies have been exposed', function(){
  it('should have loaded jquery', function(){
    expect($).to.exist;
  });
  it('should have loaded typeahead', function(){
    expect(Bloodhound).to.exist;
    expect($('input').typeahead).to.exist;
  });
  it('should have loaded Mustache', function(){
    expect(Mustache).to.exist;
  })
  it('should have loaded underscore', function(){
    expect(_).to.exist;
  })
  it('should have loaded Backbone', function(){
    expect(Backbone).to.exist;
  })
});