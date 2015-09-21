var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailShow = Backbone.View.extend({

  initialize: function(){
    this.subViews = [];
  },

  render: function(){
    
    if (mapView.hasOwnProperty('mapBounds')) {

      mapView.mapBounds();

      this.collection.each(function(model){
        var mappedTree = new Arbor.Views.MappedTree({model: model});
        this.subViews.push(mappedTree);
        mappedTree.growTree();
        mappedTree.showStopNum();
        mappedTree.extendBounds();
      }.bind(this))
      
      mapView.fitBounds();

    }
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    this.remove();
  }
})