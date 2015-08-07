var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Title = Backbone.View.extend({

  events: {
    'click': 'traceTrail'
  },

  id: 'blind-ardor',

  template: $('[data-template="blind-ardor"]').text(),

  render: function(){
    this.$el.html(this.template);
  },

  traceTrail: function(){
    this.$el.find('.changeling').replaceWith($('[data-template="trace-trail"]').text())
  },

  close: function(){
    this.remove();
  }
})