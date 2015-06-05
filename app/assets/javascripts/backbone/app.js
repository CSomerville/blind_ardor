var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };
var map;

Arbor.initialize = function(){
  new Arbor.Router();
  Backbone.history.start();
}

$(function(){
  Arbor.initialize();
})