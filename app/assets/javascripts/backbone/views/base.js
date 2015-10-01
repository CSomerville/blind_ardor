var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

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