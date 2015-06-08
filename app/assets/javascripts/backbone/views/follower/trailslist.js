var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailsList = Backbone.View.extend({

  initialize: function(){
    this.listenTo(this.collection, 'add', this.addOne);
  },

  className: 'ui grid',

  subViews: [],

  addOne: function(trail){
    var trailView = new Arbor.Views.TrailInList({model: trail});
    this.subViews.push(trailView);
    trailView.render();
    this.$el.append(trailView.el);
  },

  render: function(){
    this.collection.each(function(model){
      this.addOne(model);
    }.bind(this))
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    });
    this.remove();
  }
})