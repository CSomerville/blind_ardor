var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };




Arbor.Views.Follower = Backbone.View.extend({

  initialize: function(router){
    this.$el.html(this.template);

    this.followerNav = new Arbor.Views.FollowerNav();
    this.followerNav.render();
    this.$el.find('#nav-container').append(this.followerNav.el);

    this.router = router;
    this.listenTo(this.router, 'route', this.routeFired);

  },

  className: 'ui centered grid follower',

  template: $('[data-template="follower"]').text(),

  routeFired: function(route, params){
    console.log(route, params)
  },

  loadView: function(view){
    if (this.subView) this.subView.close();
    this.subView = view;
    this.subView.render();
    this.$el.find("#page-container").append(this.subView.el);
  },

  close: function(){
    this.followerNav.close();
    this.subView.close();
    this.remove();
  }

})