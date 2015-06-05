var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };
var mapView;
var designer;

Arbor.initialize = function(){
  new Arbor.Router();
  Backbone.history.start();
}

$(function(){
  Arbor.initialize();
})