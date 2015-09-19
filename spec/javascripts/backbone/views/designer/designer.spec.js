var expect = chai.expect;

describe("Designer View", function(){

  var designer = new Arbor.Views.Designer({});

  $('body').prepend(designer.el);

  // generic view
  var view = Backbone.View.extend({
    className: 'viewed', 
    render: function(){
    },
    close: function(){ 
      this.remove(); 
    }      
  })

  it('should initialize trailTrees collection', function(){
    expect(trailTrees).to.exist;
    expect(trailTrees).to.have.property('length');
  });

  it('should instantiate a navBubble', function(){
    expect(designer.navBubble).to.exist;
    expect(designer.navBubble).to.have.ownProperty('el');
  });

  it('should load a given view', function(){
    aView = new view();
    designer.loadView(aView);

    expect(designer.subView).to.exist;
    expect(designer.subView).to.deep.equal(aView);
    expect($('#page-container').find('.viewed').length).to.equal(1);
  });

  it('should load a given view and close any existing one', function(){

    aView = new view();
    anotherView = new view({className: 'viewed-again'});
    designer.loadView(aView);
    designer.loadView(anotherView);

    expect(designer.subView).to.exist;
    expect(designer.subView).to.deep.equal(anotherView);
    expect($('#page-container').find('.viewed').length).to.equal(0);
    expect($('#page-container').find('.viewed-again').length).to.equal(1);   
  });

  it('should remove itself and any subviews on close', function(){
    aView = new view();
    designer.loadView(aView);
    designer.close();

    expect($('#page-container').find('.viewed').length).to.equal(0);
    expect($('#page-container').length).to.equal(0);

  });
});