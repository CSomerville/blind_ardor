var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.SortingTrees = Backbone.View.extend({

  subViews: [],

  tagName: 'ul',

  id: 'trees-to-sort',

  render: function(){

    this.$el.sortable();
    this.$el.disableSelection();

    this.collection.each(function(model){
      var treeToSort = new Arbor.Views.TreeToSort({model: model});
      treeToSort.render();
      this.$el.append(treeToSort.el);
    }.bind(this))
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    });
    this.remove();
  }
})