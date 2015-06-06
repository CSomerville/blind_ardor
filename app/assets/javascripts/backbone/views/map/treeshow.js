var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TreeShow = Backbone.View.extend({

  events: {
    'click': 'close'
  },
  
  template: $('[data-template="tree-show"]').text(),

  className: 'treeshow',

  subViews: [],

  render: function(){
    this.screen = $('<div class="screen"></div>');
    this.screen.css({'height': $(window).innerHeight() + "px", 'width': $(window).innerWidth() + "px"})
    $('body').append(this.screen);
    this.$el.html(Mustache.render(this.template, this.model.attributes));

    if (Backbone.history.location.hash === '#tree-search'){
      var addButton = new Arbor.Views.AddButton({model: this.model});
      this.subViews.push(addButton);
      addButton.render();
      this.$el.find('.treeshowtext').append(addButton.el)
    }

    this.$el.find('.treeshowtext').css({'padding-top': '8%', 'padding-bottom': '8%', 'padding-left': '5%'})
    $('body').append(this.el)
  },

  close: function(){
    this.screen.remove();
    this.subViews.forEach(function(view){
      view.remove();
    })
    this.remove();
  }
})