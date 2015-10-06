var expect = chai.expect;

describe("TrailList", function(){
  var trailList, trailsStub;

  beforeEach(function(){
    trailList = new Arbor.Views.TrailList({collection: new Arbor.Collections.Trails() });
  });

  afterEach(function(){
    trailList.remove();
    trailList = undefined;
  });

  describe("initialize", function(){
    before(function(){
      trailsStub = sinon.stub(Arbor.Collections.Trails.prototype, 'fetch', function(){
        return 'fetched'
      });
      refreshSpy = sinon.spy(Arbor.Views.TrailList.prototype, 'refreshList');
      renderSpy = sinon.spy(Arbor.Views.TrailList.prototype, 'render');
    });

    after(function(){
      Arbor.Collections.Trails.prototype.fetch.restore();
      Arbor.Views.TrailList.prototype.refreshList.restore();
      Arbor.Views.TrailList.prototype.render.restore();
    });

    afterEach(function(){
      renderSpy.reset();
    });

    it("should be instantiated with a collection", function(){
      expect(trailList.collection).to.be.defined;
      expect(trailList.collection).to.be.instanceOf(Backbone.Collection);
    });

    it("should call this.render", function(){
      expect(renderSpy).to.have.been.calledOnce;
    });

    it("should listen to its collection", function(){
      trailList.collection.trigger('sync');
      expect(refreshSpy).to.have.been.calledOnce;
    });

  });
});