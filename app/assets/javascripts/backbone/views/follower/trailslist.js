var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailList = Arbor.Views.BaseView.extend({
  initialize: function(){
    Arbor.Views.BaseView.prototype.initialize.apply(this);

    if ( typeof this.collection === 'undefined') {
      throw new Error("TrailList requires collection passed as parameter")
    }

    this.render();
    this.listenTo(this.collection, 'sync', this.refreshList);
  },

  render: function(){

  },

  refreshList: function(){

  },

  addOne: function(){

  }
});

// Arbor.Views.TrailList = Backbone.View.extend({

//   initialize: function(){
//     this.listenTo(this.collection, 'add', this.addOne);
//   },

//   className: 'ui grid',

//   subViews: [],

//   addOne: function(trail){
//     var trailView = new Arbor.Views.TrailInList({model: trail});
//     this.subViews.push(trailView);
//     trailView.render();
//     this.$el.append(trailView.el);
//   },

//   render: function(){
//     this.collection.each(function(model){
//       this.addOne(model);
//     }.bind(this))
//   },

//   close: function(){
//     this.subViews.forEach(function(view){
//       view.close();
//     });
//     this.remove();
//   }
// })