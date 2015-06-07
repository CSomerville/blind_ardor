var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailShow = Backbone.View.extend({

  subViews: [],

  render: function(){
    mapView.mapBounds();

    this.collection.each(function(model){
      var mappedTree = new Arbor.Views.MappedTree({model: model});
      this.subViews.push(mappedTree);
      mappedTree.growTree();
      mappedTree.showStopNum();
      mappedTree.extendBounds();
    }.bind(this))
    
    mapView.fitBounds();
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    this.remove();
  }
})