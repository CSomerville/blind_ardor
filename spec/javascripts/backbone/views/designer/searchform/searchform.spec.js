var expect = chai.expect;

describe("SeachForm view", function(){

  var searchForm;

  before(function(){
    $fixture = $('<div id="test-fixture"></div>');
    $('body').append($fixture);

    searchForm = new Arbor.Views.SearchForm();
  });

  after(function(){
    $fixture.remove();
  });

  describe("initialize", function(){
    it('should initialize with empty subviews prop', function(){
      expect(searchForm.initialize).to.be.a('function');
      expect(searchForm.subViews).to.be.an('array');
      expect(searchForm.subViews).to.deep.equal([]);
    });

  });

  describe("search", function(){

    before(function(){

      sinon.stub(Arbor.Views.Map.prototype, "getBounds").returns({
        n: 40, s: 39, e:70, w:71 
      });
      sinon.stub(Arbor.Collections.Trees.prototype, "fetch").returns("I am a tree");

      mapView = new Arbor.Views.Map

      searchForm.search();
    });

    after(function(){
      Arbor.Views.Map.prototype.getBounds.restore();
      Arbor.Collections.Trees.prototype.fetch.restore();

      mapView = undefined;
      treeSearchResults = undefined;
    });

    it("should call treeSearchResults.fetch() correctly", function(){
      expect(treeSearchResults).to.exist;
      expect(treeSearchResults.fetch).to.have.been.calledOnce;
      expect(treeSearchResults.fetch).to.have.been.calledWithExactly({
        data: {
          species: '',
          diameter: '',
          n: 40,
          s: 39,
          e: 70,
          w: 71
        }
      });
      expect(treeSearchResults.fetch).to.have.returned('I am a tree');
    });    
  });

  describe("render", function(){
    before(function(){
      searchForm.render();
    });
    after(function(){
      searchForm.close();
    });

    it("should render the template", function(){
      expect(searchForm.$el.children().length).to.be.at.least(1);
      expect(searchForm.$el.find('select').length).to.equal(1);
      expect(searchForm.$el.find('#species-input').length).to.equal(1);
    });

    it("should instantiate and hold a reference to a species input view", function(){
      expect(searchForm.subViews.length).to.equal(1);
      expect(searchForm.subViews[0].$el.find('#species-input').length).to.equal(1);
    });
  });

  describe("close", function(){
    before(function(){
      searchForm.render();
      searchForm.close();
    });

    it("should empty the subViews array", function(){
      expect(searchForm.subViews.length).to.equal(0);
    });

    it("should remove the view from the DOM", function(){
      expect($fixture.children().length).to.equal(0);
    });
  })
});