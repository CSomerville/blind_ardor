var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TreeSave = Backbone.View.extend({
  
  render: function(){
    this.$el.html('<h1>3</h1>');
  },

  close: function(){
    this.remove();
  }
})