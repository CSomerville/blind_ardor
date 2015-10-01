var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

/* This base view provides custom functionality on top of Backbone.View
* this.subViews maintains reference to child views
* where this.close allows the parent view to clean up its children */

Arbor.Views.BaseView = Backbone.View.extend({
  initialize: function(){
    this.subViews = [];
  },

  close: function(){
    this.subViews.forEach(function(el){

      if (typeof el.close === 'function') {
        el.close();
      }

    });
    this.subViews = [];
    this.remove();
  }
});