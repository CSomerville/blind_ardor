var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Follower = Arbor.Views.BaseView.extend({
  
  initialize: function() {
    Arbor.Views.BaseView.prototype.initialize.apply(this);

    this.render();
    this.listenTo(Backbone.history, 'route', this.routeChange);
  },
  
  className: 'ui centered grid follower',

  template: $('[data-template="follower"]').text(),

  render: function(){
    this.$el.html(this.template);
    this.setSubView( {name: 'nav', view: new Arbor.Views.FollowerNav() });
    this.$el.find('#nav-container').append(this.getSubView('nav').el);
  },

  routeChange: function(router, route, params){

    if (this.getSubView('pageView')) {
      this.unsetSubView('pageView');
    }

    switch(route){
      case 'trailPick':
        this.setSubView({name: 'pageView', view: new Arbor.Views.TrailPick() });
        break;
      case 'trailFollow':
        this.setSubView({
          name: 'pageView', 
          view: new Arbor.Views.TrailFollow({params: params}) 
        });
        break;
    }

    if (this.getSubView('pageView')) {
      
      this.$el.find('#page-container')
        .append(this.getSubView('pageView').el);
    }
  },

});
