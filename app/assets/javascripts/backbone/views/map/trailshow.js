var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailShow = Backbone.View.extend({

  subViews: [],

  render: function(){
    this.collection.each(function(model){
      var mappedTree = new Arbor.Views.MappedTree({model: model});
      this.subViews.push(mappedTree);
      mappedTree.growTree();
    }.bind(this))
  }
})