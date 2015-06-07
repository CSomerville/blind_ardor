var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TreeToSort = Backbone.View.extend({

  template: $('[data-template="tree-to-sort"]').text(),

  render: function(){
    this.$el.html(Mustache.render(this.template, this.model.attributes))
  },

  close: function(){
    this.remove();
  }
})