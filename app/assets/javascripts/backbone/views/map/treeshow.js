var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TreeShow = Backbone.View.extend({

  events: {
    'click': 'close'
  },
  
  template: $('[data-template="tree-show"]').text(),

  className: 'treeshow',

  render: function(){
    this.screen = $('<div class="screen"></div>');
    this.screen.css({'height': $(window).innerHeight() + "px", 'width': $(window).innerWidth() + "px"})
    $('body').append(this.screen);
    this.$el.html(Mustache.render(this.template, this.model.attributes));
    this.$el.find('.treeshowtext').css({'padding-top': '8%', 'padding-bottom': '8%', 'padding-left': '5%'})
    $('body').append(this.el)
  },

  close: function(){
    console.log("clicked")
    this.screen.remove();
    this.remove();
  }
})