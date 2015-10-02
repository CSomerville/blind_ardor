var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

/* This base view provides custom functionality on top of Backbone.View
* this.subViews maintains reference to child views
* this.setSubView can take an object of format {name: name, view: BackboneView},
* or simply a BackboneView, in which case the view gets wrapped and 'name' set to cid
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

  getSubView: function(str) {
    if (! (typeof str === 'string')) {
      throw new TypeError('getSubView accepts argument: string');
    } else {
      var view = _.find(this.subViews, function(el) { return el.name === str });
      return (view) ? view : false;
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