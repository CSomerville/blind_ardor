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
    follower = new Arbor.Views.Follower(new Arbor.Router());
  });

  afterEach(function(){
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
    });

    it("should call its render function", function(){
      expect(renderSpy).to.have.been.calledOnce;
    });

    it("should listen for route changes", function(){
      location.href = '#trail-pick';
      expect(routeChangeSpy).to.have.been.calledOnce;
      location.href = '#trail-follow';
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

      follower.render();
      expect(follower.$el.children().length).to.be.at.least(1);
      follower.close();

    });

    it("should instantiate a navbar", function(){

      follower.render();
      expect(follower.$el.find('.follower-nav').length).to.be.at.least(1);
      follower.close();

    });
  });
});