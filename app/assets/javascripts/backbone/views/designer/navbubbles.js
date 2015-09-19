var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.NavBubbles = Backbone.View.extend({

  template: $('[data-template="nav-bubbles"]').text(),

  className: "ui five column grid",

  render: function(){
    this.$el.html(this.template);
  },

  select: function(){

    this.$el.find('.selected').removeClass('selected');

    switch(Backbone.history.location.hash){
      case '#tree-search':
        this.$el.find('#one').attr('class', 'selected');
        break;
      case '#tree-sort':
        this.$el.find('#two').attr('class', 'selected');
        break;
      case '#tree-save':
        this.$el.find('#three').attr('class', 'selected');
        break;
    }
  },

  close: function(){
    this.remove();
  }
})