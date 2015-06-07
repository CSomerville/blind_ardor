var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.MappedTree = Backbone.View.extend({

  initialize: function(){

    this.listenTo(this.model, 'change', this.updateStopNum);

    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(parseFloat(this.model.get("lat")), parseFloat(this.model.get("long"))),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillOpacity: 1,
        strokeColor: '#38DB00',
        fillColor: '#38DB00'
      }
    })

    google.maps.event.addListener(this.marker, 'mouseover', this.grow.bind(this));
    google.maps.event.addListener(this.marker, 'mouseout', this.shrink.bind(this));
    google.maps.event.addListener(this.marker, 'click', this.showTree.bind(this))
  },

  growTree: function(){
    mapView.growTree(this.marker)
  },

  grow: function(){
    this.marker.setIcon({
      path: google.maps.SymbolPath.CIRCLE,
      scale: 9,
      fillOpacity: 1,
      strokeColor: '#38DB00',
      fillColor: '#38DB00'
    })
  },

  shrink: function(){
    this.marker.setIcon({
      path: google.maps.SymbolPath.CIRCLE,
      scale: 7,
      fillOpacity: 1,
      strokeColor: '#38DB00',
      fillColor: '#38DB00'
    })   
  },

  changeColor: function(color){
    this.marker.setIcon({
      path: google.maps.SymbolPath.CIRCLE,
      scale: 7,
      fillOpacity: 1,
      strokeColor: color,
      fillColor: color
    }) 
  },

  showTree: function(){
    var treeShow = new Arbor.Views.TreeShow({model: this.model});
    treeShow.render();
  },

  extendBounds: function(){
    mapView.extendBounds(this.marker.getPosition());
  },

  showStopNum: function(){

    this.infoWindow = new google.maps.InfoWindow({
      content: (this.model.get('stop_num')+1).toString()
    })

    mapView.addInfo(this.infoWindow, this.marker);
  },

  updateStopNum: function(){
    if (this.infoWindow){
      this.infoWindow.close();
      this.showStopNum();      
    }
  },

  close: function(){
    if (this.infoWindow) this.infoWindow.close();
    this.marker.setMap(null);
    this.remove();
  }


})