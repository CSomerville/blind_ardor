var expect = chai.expect;

describe("Arbor.Views.Follower", function(){

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
    follower = undefined;
  });

  describe("initialize", function(){
    before(function(){
      var renderSpy = sinon.spy(Arbor.Views.Follower.protoype, 'render');
      var routeChangeSpy = sinon.spy(Arbor.Views.Follower.prototype, 'routeChange');
    });

    after(function(){
      Arbor.Views.Follower.prototype.render.restore();
    });

    it("should call its render function", function(){
      expect(renderSpy).to.have.been.calledOnce;
    });

    it("should listen for route changes", function(){
      location.href = '/#trail-pick';
      expect(routeChange).to.have.been.calledOnce;
      location.href = '/#trail-follow';
      expect(routeChange).to.have.been.calledTwice;
      location.href = '/';
    });
  });

  describe("render", function(){
    before(function(){
      Arbor.Views.FollowerNav = Arbor.Views.FollowerNav || Backbone.View.extend({
        render: function() { this.$el.html('<div class="follower-nav"></div>') }
      });
    });

    beforeEach(function(){
      follower.render();
    });

    afterEach(function(){
      follower.close();
    });

    it("should render the template", function(){
      expect(this.$el.html.children().length).to.be.at.least(1);
    });

    it("should instantiate a navbar", function(){
      expect(this.$el.html.find('.follower-nav').length).to.be.at.least(1);
    });
  });
});