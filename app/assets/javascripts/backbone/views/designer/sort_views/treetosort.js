var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TreeToSort = Backbone.View.extend({

  events : {
    'mouseover': 'makeMarkerOrange',
    'mouseout': 'makeMarkerGreen'
  },

  template: $('[data-template="tree-to-sort"]').text(),

  tagName: 'li',

  className: 'ui-state-default',

  makeMarkerOrange: function(){
    this.marker.changeColor('#E35304');
  },

  makeMarkerGreen: function(){
    this.marker.changeColor('#38DB00')
  },

  render: function(){
    this.$el.html(Mustache.render(this.template, this.model.attributes))
  },

  close: function(){
    this.remove();
  }
})