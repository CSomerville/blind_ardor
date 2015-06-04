var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };
var treeDataCollection;

Arbor.initialize = function(){
  new Arbor.Router();
  Backbone.history.start();
}

$(function(){
  Arbor.initialize();
})