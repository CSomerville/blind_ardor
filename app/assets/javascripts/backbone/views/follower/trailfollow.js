var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailFollow = Backbone.View.extend({

  template: $('[data-template="trail-follow"]').text(),

  className: 'ui centered grid',

  subViews: [],

  render: function(){
    this.$el.html(this.template);

    mapView = mapView || new Arbor.Views.Map();
    mapView.$el.css('height', '100%');
    if (mapView.$el.css('display') === 'none') mapView.$el.css('display', 'block');
    this.$el.find("#save-map-container").css('height', 0.66666 * $(window).innerHeight() + "px").append(mapView.el)

    var trailToShow = trails.get(this.id)
    var treesOnTrail = _.pluck(trailToShow.get("stops"), 'tree');
    this.collection = new Arbor.Collections.Trees();
    treesOnTrail.forEach(function(tree){
      this.collection.add(new Arbor.Models.Tree(tree));
    }.bind(this))

    mapView.mapBounds();
    
    if (mapView.getBounds()) {
      this.callMarkers();
    } else {
      mapView.afterTilesLoaded(this.callMarkers.bind(this))
    }
  },

  callMarkers: function(){
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