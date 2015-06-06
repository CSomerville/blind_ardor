var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.AddButton = Backbone.View.extend({

  events: {
    'click': 'addTree'
  },

  template: $('[data-template="add-button"]').text(),

  render: function(){
    this.$el.html(this.template);
  },

  addTree: function(){
    trailTrees.add(this.model);
  }
})