var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Designer = Backbone.View.extend({

  initialize: function(){

    trailTrees = trailTrees || new Arbor.Collections.Trees();
    if (trailTrees.length > 0) trailTrees.reset();

    this.$el.html(this.template);
    this.navBubble = new Arbor.Views.NavBubbles();
    this.navBubble.render();
    this.$el.find('#bubble-container').append(this.navBubble.el);    
  },

  className: 'ui centered grid',

  template: $('[data-template="designer"]').text(),

  loadView: function(view){
    if (this.subView) this.subView.close();
    this.subView = view;
    this.subView.render();
    this.$el.find('#page-container').append(this.subView.el)
    this.navBubble.select();
  }  
})