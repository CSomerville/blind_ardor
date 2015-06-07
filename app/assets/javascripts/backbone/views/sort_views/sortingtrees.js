var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.SortingTrees = Backbone.View.extend({

  initialize: function(){
    this.$el.sortable();
    this.$el.disableSelection();
  },

  events: {
    'sortupdate': 'reassignStopNums'
  },

  subViews: [],

  tagName: 'ul',

  id: 'trees-to-sort',

  render: function(){

    this.collection.each(function(model){
      var treeToSort = new Arbor.Views.TreeToSort({model: model});
      treeToSort.render();
      this.$el.append(treeToSort.el);
    }.bind(this))
  },

  reassignStopNums: function(event){
    _.each($(event.target).children(), function(tree, index){
      var model = this.collection.get($(tree).find('p').data().id)
      model.set("stop_num", index);
    }.bind(this))
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    });
    this.remove();
  }
})