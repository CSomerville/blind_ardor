var expect = chai.expect;

describe("BaseView", function(){
  var $fixture, ChildView, childView;
  before(function(){
    $fixture = $('<div id="test-fixture"></div>');
    $('body').append($fixture);

    // dummy childview to test BaseView inheritance
    ChildView = Arbor.Views.BaseView.extend({
      initialize: function(){
        Arbor.Views.BaseView.prototype.initialize.apply(this);
      },

      render: function() {
        this.$el.html('<h1>I have been rendered</h1>');
        $('#test-fixture').html(this.el);
      },

      addChild: function() {
        var childView = new ChildView();
        this.setSubView({name: 'firstBorn', view: childView});
        childView.render();
        this.$el.append(childView.el);
      }
    });
  });

  after(function(){
    $fixture.remove();
    ChildView = undefined;
  });

  beforeEach(function(){
    childView = new ChildView();
  });

  afterEach(function(){
    childView = undefined;
  }); 

  describe("initialization", function(){
    it("should initialize child views with subViews property", function(){
      expect(childView.subViews).to.deep.equal([]);
    });


    it("the subViews array should hold references to subViews", function(){
      childView.addChild();
      expect(childView.subViews.length).to.equal(1);
    });

    it("should initialze an empty subViews array for each child", function(){
      childView.addChild();
      expect(childView.subViews[0].view.subViews).to.deep.equal([]);
    });
  });

  describe("setSubView", function(){

    it("should accept an object with keys of 'name' and 'view'", function(){
      childView.addChild();

      expect(Object.keys(childView.subViews[0])).to.deep.equal(['name', 'view']);
      expect(childView.subViews[0].name).to.equal('firstBorn');
      expect(childView.subViews[0].view.cid).to.be.defined;
    });

    it("should not accept a 'view' that is not a Backbone View", function(){
      
      expect(childView.setSubView.bind({name: 'ung', view: 'paradise'})).to.throw(Error);
      expect(childView.setSubView.bind(['ok'])).to.throw(Error);

    });

    it("should accept an object that is a Backbone View and assign it a name of cid", function(){
      childView.setSubView(new ChildView());

      expect(childView.subViews.length).to.equal(1);
      expect(childView.subViews[0].name).to.equal(childView.subViews[0].view.cid);
    });
  });

  describe("getSubView", function(){

    it("should be called with a string", function(){
      childView.addChild();
      expect(childView.getSubView('firstBorn')).to.be.ok;
      expect(childView.getSubView.bind({})).to.throw(TypeError);
      expect(childView.getSubView.bind(1)).to.throw(TypeError);
    });

    it("should return an instance of view if the view is found", function(){
      childView.setSubView({name: 'soDreamy', view: new ChildView()});
      expect(childView.getSubView('soDreamy')).to.be.an.instanceOf(Backbone.View);
    });

    it("should return 'false' if the view is not found", function(){
      expect(childView.getSubView('neener')).to.be.false;
    });
  });

  describe("close", function(){

    it("should empty the subViews array", function(){

      childView.addChild();
      childView.render();
      childView.close();

      expect(childView.subViews).to.deep.equal([]);
    });

    it("should remove the childView from the DOM", function(){
      childView.render();
      expect($('#test-fixture').children().length).to.equal(1);
      childView.close();
      expect($('#test-fixture').children().length).to.equal(0);
    });

    it("should be called the correct number of times", function(){
      var closeSpy = sinon.spy(Arbor.Views.BaseView.prototype, 'close');

      childView.close();
      expect(closeSpy).to.have.been.calledOnce;

      childView.addChild();
      childView.close();
      expect(closeSpy).to.have.been.calledThrice;

      Arbor.Views.BaseView.prototype.close.restore();
    });

    it("should handle subViews without close methods gracefully", function(){
      var view = Backbone.View.extend({});
      childView.subViews.push({name: 'duck', view: view});
      childView.close();
    });
  });
});