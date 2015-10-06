var expect = chai.expect;

describe("TrailFilter", function(){
  var trailFilter, getBoundsStub, renderSpy, handleGetBoundsSpy;

  before(function(){
    mapView = mapView || new Arbor.Views.Map();
    getBoundsStub = sinon.stub(Arbor.Views.Map.prototype, 'getBounds', function(){
      return {n: 41, s: 40, e: 73, w: 74};
    })
  });

  after(function(){
    Arbor.Views.Map.prototype.getBounds.restore();
  });

  beforeEach(function(){
    trailFilter = new Arbor.Views.TrailFilter();
  });

  afterEach(function(){
    trailFilter.remove();
    trailFilter = undefined;
  });

  describe("initialize", function(){
    before(function(){
      renderSpy = sinon.spy(Arbor.Views.TrailFilter.prototype, 'render');
      handleBoundsChangedSpy = sinon.spy(Arbor.Views.TrailFilter.prototype, 'handleBoundsChanged');
    });

    after(function(){
      Arbor.Views.TrailFilter.prototype.render.restore();
      Arbor.Views.TrailFilter.prototype.handleBoundsChanged.restore();
    });

    it("should call this.render", function(){
      expect(renderSpy).to.have.been.calledOnce;
    });

    it("should listen to map events", function(){
      mapView.boundsChanged();
      expect(handleBoundsChangedSpy).to.have.been.calledOnce;
      expect(handleBoundsChangedSpy).to.have.been.calledWith({n: 41, s: 40, e: 73, w: 74});
    });
  });

  describe("render", function(){

    it("should render the template", function(){
      expect(trailFilter.$el.children().length).to.be.at.least(1);
    });

    it("should append the map", function(){
      expect(trailFilter.$el.find('#map-canvas').length).to.equal(1);
    });
  });
});