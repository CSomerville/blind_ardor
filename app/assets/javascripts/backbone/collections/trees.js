var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} }

Arbor.Collections.Trees = Backbone.Collection.extend({

  initialize: function(){
    this.listenTo(this, 'add', this.assignStopNum)
  },

  model: Arbor.Models.Tree,

  url: 'api/trees',

  assignStopNum: function(model){
    model.set("stop_num", this.indexOf(model))
  }
})