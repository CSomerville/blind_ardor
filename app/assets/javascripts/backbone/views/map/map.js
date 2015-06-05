var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Map = Backbone.View.extend({

  initialize: function(){
    var mapOptions = {
      zoom: 10,
      center: new google.maps.LatLng(40.7127, -74.0059)
    }
    this.map = new google.maps.Map(this.el, mapOptions)
  },

  id: "map-canvas",

  getBounds: function(){
    return this.map.getBounds();
  }

})