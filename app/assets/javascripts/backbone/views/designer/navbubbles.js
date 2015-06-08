var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.NavBubbles = Backbone.View.extend({

  template: $('[data-template="nav-bubbles"]').text(),

  className: "ui five column grid",

  render: function(){
    this.$el.html(this.template);
  },

  select: function(){
    this.$el.find('.nav-bubble a').css({'background-color': '', 'color': ''});
    var selected = {'background-color': 'white', 'color': 'rgb(227, 83, 4)'};

    switch(Backbone.history.location.hash){
      case '#tree-search':
        this.$el.find('#one').css(selected);
        break;
      case '#tree-sort':
        this.$el.find('#two').css(selected);
        break;
      case '#tree-save':
        this.$el.find('#three').css(selected);
        break;
    }
  },

  close: function(){
    this.remove();
  }
})