var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TreeSort = Backbone.View.extend({
  
  render: function(){
    this.$el.html('<h1>2</h1>');
  },

  close: function(){
    this.remove();
  }
})