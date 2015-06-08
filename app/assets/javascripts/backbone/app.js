var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };
var mapView;
var designer;
var follower;
var splash;
var treeSearchResults;
var trailTrees;
var trails;

Arbor.initialize = function(){
  new Arbor.Router();
  Backbone.history.start();
}

$(function(){
  Arbor.initialize();
})