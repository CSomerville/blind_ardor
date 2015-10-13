var expect = chai.expect;

describe.skip("Arbor.Views.Follower", function(){

  var $fixture, follower;

  before(function(){
    $fixture = $('<div id="test-fixture"></div>');
    $('body').append($fixture);

  });

  after(function(){
    $fixture.remove();
  });

  beforeEach(function(){
    follower = new Arbor.Views.Follower();
  });

  afterEach(function(){
    follower.remove();
    follower = undefined;
  });

  describe("initialize", function(){
    var renderSpy, routeChangeSpy;

    before(function(){
      renderSpy = sinon.spy(Arbor.Views.Follower.prototype, 'render');
      routeChangeSpy = sinon.spy(Arbor.Views.Follower.prototype, 'routeChange');
    });

    after(function(){
      Arbor.Views.Follower.prototype.render.restore();
      Arbor.Views.Follower.prototype.routeChange.restore();
    });

    it("should call its render function", function(){
      expect(renderSpy).to.have.been.calledOnce;
    });

    it("should listen for route changes", function(){
      Backbone.history.trigger('route');
      expect(routeChangeSpy).to.have.been.calledOnce;
      Backbone.history.trigger('route');
      expect(routeChangeSpy).to.have.been.calledTwice;
      location.href = '';
    });
  });

  describe("render", function(){
    before(function(){
      Arbor.Views.FollowerNav = Arbor.Views.FollowerNav || Backbone.View.extend({
        render: function() { this.$el.html('<div class="follower-nav"></div>') }
      });
    });

    it("should render the template", function(){

      expect(follower.$el.children().length).to.be.at.least(1);

    });

    it("should instantiate a navbar", function(){

      follower.render();
      expect(follower.$el.find('.follower-nav').length).to.be.at.least(1);
      follower.close();

    });
  });

  describe("routeChange", function(){
    var pickStub, followStub;

    before(function(){
      pickStub = sinon.stub(Arbor.Views.TrailPick.prototype, 'initialize', function(){
        Arbor.Views.BaseView.prototype.initialize.apply(this);
        this.$el.html('<div class="stubbed-trailpick"></div>');
      });
      followStub = sinon.stub(Arbor.Views.TrailFollow.prototype, 'initialize', function(opts){
        this.$el.html('<div class="stubbed-trailfollow data-id="' + opts.params + '"></div>');
      });
    })

    after(function(){
      Arbor.Views.TrailPick.prototype.initialize.restore();
      Arbor.Views.TrailFollow.prototype.initialize.restore();
    });

    it("should instantiate the correct view", function(){
      Backbone.history.trigger('route', null, '/#trail-pick');
      expect(pickStub).to.have.been.calledOnce;
      expect(follower.getSubView('pageView')).to.exist;
      expect(follower.$el.find('.stubbed-trailpick').length).to.equal(1);
    });

    it("should swap out subviews on route-change", function(){

      Backbone.history.trigger('route', null, '/#trail-pick');
      Backbone.history.trigger('route', null, '/#trail-follow', 2);

      expect(followStub).to.have.been.calledOnce;
      expect(follower.getSubView('pageView')).to.exist;
      expect(follower.$el.find('.stubbed-trailpick').length).to.equal(0);
      expect(follower.$el.find('.stubbed-trailfollow').length).to.equal(1);
    });
  });
});