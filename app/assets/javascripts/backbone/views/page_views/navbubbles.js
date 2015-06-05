var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.NavBubbles = Backbone.View.extend({

  template: $('[data-template="nav-bubbles"]').text(),

  className: "ui three column grid",

  render: function(){
    this.$el.html(this.template);
  }
})