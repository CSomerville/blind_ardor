var expect = chai.expect;

describe("TrailPick View", function(){

  var $fixture, trailPick;

  before(function(){
    
    $fixture = $('<div id="test-fixture"></div>');
    $('body').append($fixture);
    mapView = mapView || new Arbor.Views.Map();

    // subViews required by render fn
    Arbor.Views.TrailList = Arbor.Views.TrailList || Arbor.Views.BaseView.extend({});
    Arbor.Views.TrailFilter = Arbor.Views.TrailFilter || Arbor.Views.BaseView.extend({});
  });

  after(function(){
    $fixture.remove();
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
      handleBoundsChangedSpy = sinon.spy(Arbor.Views.TrailPick.prototype, 'handleBoundsChanged')
      mapStub = sinon.stub(Arbor.Views.Map.prototype, 'getBounds', function(){
        return {n: 41, s: 40, e: 73, w: 74};
      });
    });

    after(function(){
      Arbor.Views.Map.prototype.getBounds.restore();
    });

    it("Should call this.render", function(){
      expect(renderSpy).to.have.been.calledOnce;
    });

    it("should listen to map bounds change", function(){
      mapView.boundsChanged();
      expect(handleBoundsChangedSpy).to.have.been.calledOnce;
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
      dump(trailPick.el);
      expect(trailPick.$el.find('#trail-list').length).to.equal(1);
      expect(trailPick.$el.find('#trail-filter').length).to.equal(1);
    });
  });
});