var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Designer = Backbone.View.extend({

  initialize: function(){
    this.$el.html(this.template);
    var navBubble = new Arbor.Views.NavBubbles();
    navBubble.render();
    this.$el.find('#bubble-container').append(navBubble.el);    
  },

  className: 'ui centered grid',

  template: $('[data-template="designer"]').text(),

  loadView: function(view){
    if (this.subView) this.subView.close();
    this.subView = view;
    this.subView.render();
    this.$el.find('#page-container').append(this.subView.el)
  }  
})