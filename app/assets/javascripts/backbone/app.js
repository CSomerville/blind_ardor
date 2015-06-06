var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };
var mapView;
var designer;
var treeSearchResults;

Arbor.initialize = function(){
  new Arbor.Router();
  Backbone.history.start();
}

$(function(){
  Arbor.initialize();
})