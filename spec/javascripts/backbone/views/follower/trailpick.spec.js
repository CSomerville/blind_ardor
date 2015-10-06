var expect = chai.expect;

describe("TrailPick View", function(){

  var $fixture, trailPick;

  before(function(){
    
    $fixture = $('<div id="test-fixture"></div>');
    $('body').append($fixture);
    mapView = mapView || new Arbor.Views.Map();

    // subViews required by render fn
    Arbor.Views.TrailList = Arbor.Views.TrailList || Arbor.Views.BaseView.extend({});
    Arbor.Views.TrailFilter = Arbor.Views.TrailFilter || 
                              Arbor.Views.BaseView.extend({
                                paramsChanged: function(){}
                              });

    // squash fetch behavior
    trailsFetchStub = sinon.stub(Arbor.Collections.Trails.prototype, 'fetch', function(){
      return 'I fetched'
    }); 
  });

  after(function(){
    $fixture.remove();
    Arbor.Collections.Trails.prototype.fetch.restore();
  });

  beforeEach(function(){
    trailPick = new Arbor.Views.TrailPick();
  });

  afterEach(function(){
    trailPick.remove();
    trailPick = undefined;
  });

  describe("initialize", function(){
    var renderSpy, handleBoundsChangedSpy, mapStub;
    
    before(function(){
      renderSpy = sinon.spy(Arbor.Views.TrailPick.prototype, 'render');
      addListenersSpy = sinon.spy(Arbor.Views.TrailPick.prototype, 'addListeners');
    });

    after(function(){
      Arbor.Views.TrailPick.prototype.render.restore();
      Arbor.Views.TrailPick.prototype.addListeners.restore();
    });

    it("Should call this.render and this.addListeners", function(){
      expect(renderSpy).to.have.been.calledOnce;
      expect(addListenersSpy).to.have.been.calledOnce;
    });

    it("Should instantiate Trails collection", function(){
      expect(trailPick.collection).to.be.defined;
      expect(trailPick.collection).to.be.instanceOf(Backbone.Collection);
    });

    it("Should call fetch", function(){
      expect(trailsFetchStub).to.have.been.called;
    });
  });

  describe("render", function(){
    before(function(){

      trailListStub = sinon.stub(Arbor.Views.TrailList.prototype, 'initialize', function(){
        this.$el.html('<div id="trail-list"></div>');
      });
      trailFilterStub = sinon.stub(Arbor.Views.TrailFilter.prototype, 'initialize', function(){
        this.$el.html('<div id="trail-filter"></div>');
      });
    });

    after(function(){
      Arbor.Views.TrailList.prototype.initialize.restore();
      Arbor.Views.TrailFilter.prototype.initialize.restore();
    });

    it("should render the template", function(){
      expect(trailPick.$el.children().length).to.be.at.least(1);
    });

    it("should load load two subViews", function(){
      expect(trailPick.subViews.length).to.equal(2);
      expect(trailPick.getSubView('trailFilter')).to.be.ok;
      expect(trailPick.getSubView('trailList')).to.be.ok;
    });

    it("should render the subViews", function(){
      expect(trailPick.$el.find('#trail-list').length).to.equal(1);
      expect(trailPick.$el.find('#trail-filter').length).to.equal(1);
    });
  });

  describe("addListeners", function() {

    before(function(){
      trailFilterStub = sinon.stub(Arbor.Views.TrailFilter.prototype, 'initialize', function(){
        this.$el.html('<div id="trail-filter"></div>');
      });
      paramsChangedStub = sinon.stub(Arbor.Views.TrailFilter.prototype, 'paramsChanged', function(){
        this.trigger('paramsChanged', {n: 41, s: 40, e: 73, w: 74}, 'pinoak');
      });
      handleParamsChangedSpy = sinon.spy(Arbor.Views.TrailPick.prototype, 'handleParamsChanged');
    });

    after(function(){
      Arbor.Views.TrailFilter.prototype.initialize.restore();
      Arbor.Views.TrailFilter.prototype.paramsChanged.restore();
    });

    it("Should correctly call handleParamsChanged", function(){
      trailPick.getSubView('trailFilter').paramsChanged();
      expect(handleParamsChangedSpy).to.have.been.calledOnce;
      expect(handleParamsChangedSpy).to.have.been.calledWith({n: 41, s: 40, e: 73, w: 74}, 'pinoak');
    });
  });

  describe("handleParamsChanged", function(){
    beforeEach(function(){
      trailsFetchStub.reset();
    })

    it("should call fetch with provided args", function(){
      trailPick.handleParamsChanged({n: 41, s: 40, e: 73, w: 74}, 'pinoak');
      expect(trailsFetchStub).to.have.been.calledOnce;
      expect(trailsFetchStub).to.have.been.calledWith({
        data: {
          bounds: {n: 41, s: 40, e: 73, w: 74},
          species: 'pinoak'
        }
      });
    });

    it("should accept fewer args", function(){
      trailPick.handleParamsChanged({n: 41, s: 40, e: 73, w: 74});
      expect(trailsFetchStub).to.have.been.calledWith({
        data: {
          bounds: {n: 41, s: 40, e: 73, w: 74}
        }
      });

      trailPick.handleParamsChanged(null, 'pinoak');
      expect(trailsFetchStub).to.have.been.calledWith({
        data: {species: 'pinoak'}
      });
    });

    it("should handle bad args gracefully", function(){
      trailPick.handleParamsChanged({n: 41, s: 40});
      expect(trailsFetchStub).to.have.been.calledWith({data: {}});

      trailPick.handleParamsChanged(1, 2, 3);
      expect(trailsFetchStub).to.have.been.calledWith({data: {}});

    });
  });
});