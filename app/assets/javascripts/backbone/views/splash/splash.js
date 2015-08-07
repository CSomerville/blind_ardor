var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Splash = Backbone.View.extend({

  subViews: [],

  render: function(){
    // this.ghostDiv = $('<div>').css("height", $(window).innerHeight() + "px")
    // $('body').append(this.ghostDiv)
    this.$el.css("height", $(window).innerHeight() + "px");
    this.$el.append($('<div>').css("height", "40%"))
    $('body').append(this.el)

    var glade = new Arbor.Views.Glade();
    this.$el.append(glade.el);
    this.subViews.push(glade);
    glade.render();

    var title = new Arbor.Views.Title();
    title.render();
    this.subViews.push(title);
    this.$el.append(title.el);
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    this.remove();
  }
})