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
      refreshSpy = sinon.spy(Arbor.Views.TrailList.prototype, 'refreshList');
    });

    after(function(){
      Arbor.Views.TrailList.prototype.refreshList.restore();
    });

    it("should be instantiated with a collection", function(){
      expect(trailList.collection).to.be.defined;
      expect(trailList.collection).to.be.instanceOf(Backbone.Collection);
      expect(Arbor.Views.TrailList.prototype.initialize.bind({collection: null})).to.throw(Error);
    });

    it("should listen to its collection", function(){
      trailList.collection.trigger('sync');
      expect(refreshSpy).to.have.been.calledOnce;
    });
  });

  describe("refreshList", function(){
    var testTrailsOne, testTrailsTwo, trailInListStub;
    
    before(function(){

      trailInListStub = sinon.stub(Arbor.Views.TrailInList.prototype, 'initialize', function(){
        this.className = '';
        this.$el.html('<div><div id="' + this.model.get('name') + '"></div></div>');
      });

      testTrailsOne = [
        { id: 1, name: 'unk'},
        { id: 3, name: 'blah'},
        { id: 5, name: 'urf'}
      ];
      testTrailsTwo = [
        { id: 4, name: 'ort'},
        { id: 5, name: 'urf'}
      ];

      unsetSubViewSpy = sinon.spy(Arbor.Views.BaseView.prototype, 'unsetSubView');
    });

    after(function(){
      Arbor.Views.TrailInList.prototype.initialize.restore();
    });

    afterEach(function(){
      trailInListStub.reset();
      unsetSubViewSpy.reset();
    });

    it("should load the trails as subViews", function(){
      trailList.collection.add(testTrailsOne);
      trailList.collection.trigger('sync');

      expect(trailList.subViews.length).to.equal(3);
      expect(trailList.getSubView('3').$el.children().first().html()).to.equal('<div id="blah"></div>');
      expect(trailInListStub).have.been.calledThrice;
    });

    it("should append trailViews to itself", function(){
      trailList.collection.add(testTrailsOne);
      trailList.collection.trigger('sync');

      expect(trailList.$el.find('#blah').length).to.equal(1);
    });

    it("should update subViews on sync", function(){
      trailList.collection.add(testTrailsOne);
      trailList.collection.trigger('sync');
      trailList.collection.reset(testTrailsTwo);
      trailList.collection.trigger('sync');

      expect(unsetSubViewSpy).to.have.been.calledTwice;
      expect(trailList.subViews.length).to.equal(2);
    });

    it("should render new subViews", function(){
      trailList.collection.add(testTrailsOne);
      trailList.collection.trigger('sync');
      trailList.collection.reset(testTrailsTwo);
      trailList.collection.trigger('sync');

      expect(trailList.$el.find('#ort').length).to.equal(1);
      expect(trailList.$el.find('#blah').length).to.equal(0);
    })
  });
});