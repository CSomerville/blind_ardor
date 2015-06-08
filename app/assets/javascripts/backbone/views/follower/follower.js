var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Follower = Backbone.View.extend({

  initialize: function(){
    $('body').css("background-color", "#00D2DB")
    this.$el.html(this.template);

    this.followerNav = new Arbor.Views.FollowerNav();
    this.followerNav.render();
    this.$el.find('#nav-container').append(this.followerNav.el)
  },

  className: 'ui centered grid',

  template: $('[data-template="follower"]').text(),

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