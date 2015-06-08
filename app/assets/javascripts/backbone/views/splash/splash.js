var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Splash = Backbone.View.extend({

  subViews: [],

  render: function(){
    $('body').append(this.el);

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