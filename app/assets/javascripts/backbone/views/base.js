var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

/* This base view provides custom functionality on top of Backbone.View
* this.subViews maintains reference to child views
* where this.close allows the parent view to clean up its children */

Arbor.Views.BaseView = Backbone.View.extend({
  initialize: function(){
    this.subViews = [];
  },

  setSubView: function(obj) {

    if ( _.has(obj, 'name') && _.has(obj, 'view')) {
      if (obj.view instanceof Backbone.View) {
        this.subViews.push(obj);
      } else {
        throw new Error('subView must be instanceof Backbone.View');
      }
    } else if (obj instanceof Backbone.View) {
      this.subViews.push({name: obj.cid, view: obj});
    } else {
      throw new Error('subView must be instanceof Backbone.View');
    }
  },

  close: function(){
    this.subViews.forEach(function(el){

      if (typeof el.view.close === 'function') {
        el.view.close();
      }

    });
    this.subViews = [];
    this.remove();
  }
});