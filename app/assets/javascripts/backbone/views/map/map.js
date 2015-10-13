var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Map = Backbone.View.extend({

  initialize: function(){
    if (typeof google !== 'undefined'){
      
      var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(40.7127, -74.0059),
        styles: mapStyle
      };

      this.map = new google.maps.Map(this.el, mapOptions);

      google.maps.event.addListener(this.map, 'bounds_changed', this.boundsChanged.bind(this));
    }


  },

  id: "map-canvas",

  getBounds: function(){
    var bounds = {};
    var googleBounds = this.map.getBounds();

    bounds.n = googleBounds.getNorthEast().lat();
    bounds.e = googleBounds.getNorthEast().lng();
    bounds.s = googleBounds.getSouthWest().lat();
    bounds.w = googleBounds.getSouthWest().lng();

    return bounds;
  },

  boundsChanged: function(){
    this.trigger('boundsChanged', this.getBounds());
  },  

  mapBounds: function(){
    this.bounds = this.map.getBounds();
  },

  extendBounds: function(markerPosition){
    this.bounds.extend(markerPosition);
  },

  fitBounds: function(){
    this.map.fitBounds(this.bounds);
    google.maps.event.addListenerOnce(this.map, 'bounds_changed', function() {
      if (this.map.getZoom()) this.map.setZoom(14);
    }.bind(this));
  },

  growTree: function(tree){
    tree.setMap(this.map)
  },

  addInfo: function(infoWindow, marker){
    infoWindow.open(this.map, marker)
  },

  afterTilesLoaded: function(cb){
    google.maps.event.addListenerOnce(this.map, 'tilesloaded', function(){
      cb();
    })
  },

  resize: function(){
    google.maps.event.trigger(this.map, 'resize')
  }

})