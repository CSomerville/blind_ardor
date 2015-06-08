var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Title = Backbone.View.extend({

  events: {
    'click': 'traceTrail'
  },

  template: $('[data-template="blind-ardor"]').text(),

  render: function(){
    this.$el.html(this.template);
  },

  traceTrail: function(){
    this.$el.html($('[data-template="trace-trail"]').text())
  },

  close: function(){
    console.log('in here')
    this.remove();
  }
})