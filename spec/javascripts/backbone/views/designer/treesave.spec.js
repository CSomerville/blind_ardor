var expect = chai.expect;

describe("TreeSave View", function(){
  var $fixture, treeSave;

  before(function(){
    $fixture = $('<div id="test-fixture"></div>');
    $('body').append($fixture);
    treeSave = new Arbor.Views.TreeSave();
  });

  after(function(){
    $fixture.remove();
    treeSave = null;
  });

  describe("initialize", function(){

    it('should initialize with empty subviews prop', function(){
      expect(treeSave.initialize).to.be.a('function');
      expect(treeSave.subViews).to.be.an('array');
      expect(treeSave.subViews).to.deep.equal([]);
    });

  });

  describe("render", function(){

    before(function(){
      // Dummy mapView
      MapView = Backbone.View.extend({el: $('<div id="map-view"></div>')});
      mapView = new MapView();
      treeSave.render();
      $fixture.append(treeSave.el);
    });

    after(function(){
      mapView = null;
      treeSave.close();
    });

    it('should render its template', function(){
      expect(treeSave.$el.children().length).to.be.at.least(1);
      expect($fixture.children().length).to.be.at.least(1);
      expect($fixture.find('#save-form-container').length).to.equal(1);
    });

    it('should render the mapView', function(){
      expect(treeSave.$el.find('#map-view').length).to.equal(1);
    });

    it('should render trailShow and saveForm, storing them as subViews', function(){
      expect(treeSave.subViews.length).to.equal(2);
      expect(treeSave.$el.find('form').length).to.equal(1);
    });
  });

  describe("close", function(){

    before(function(){
      // Dummy mapView
      MapView = Backbone.View.extend({el: $('<div id="map-view"></div>')});
      mapView = new MapView();
      treeSave.render();
      treeSave.close();
      mapView = null;
    });

    it('should remove subViews', function(){
      expect(treeSave.subViews).to.deep.equal([]);
      expect(treeSave.$el.find('form').length).to.equal(0);     
    });

    it('should remove itself from the DOM', function(){
      expect($fixture.children().length).to.equal(0);
    });
  });
});