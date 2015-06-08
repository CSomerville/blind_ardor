var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.FollowerNav = Backbone.View.extend({

  template: $('[data-template="follower-nav"]').text(),

  className: 'ui grid three column',

  render: function(){
    this.$el.html(this.template);
  },

  close: function(){
    this.remove();
  }
})