var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Map = Backbone.View.extend({

  initialize: function(){

    var mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng(40.7127, -74.0059),
      styles: mapStyle
    };

    this.map = new google.maps.Map(this.el, mapOptions);
  },

  id: "map-canvas",

  getBounds: function(){
    return this.map.getBounds();
  },

  mapBounds: function(){
    this.bounds = this.getBounds();
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
  }

})