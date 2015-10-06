var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailPick = Arbor.Views.BaseView.extend({
  initialize: function(){
    Arbor.Views.BaseView.prototype.initialize.apply(this);

    this.render();
    this.listenTo(mapView, 'boundsChanged', this.handleBoundsChanged);
  },

  className: 'ui centered grid',

  template: $('[data-template="trail-pick"]').text(),

  render: function(){
    
    this.$el.html(this.template);

    this.setSubView({name: 'trailList', view: new Arbor.Views.TrailList() });
    this.setSubView({name: 'trailFilter', view: new Arbor.Views.TrailFilter() });

    this.$el.find('#trail-list-container')
      .append(this.getSubView('trailList').el);

    this.$el.find('#trail-filter-container')
      .append(this.getSubView('trailFilter').el);
  },

  handleBoundsChanged: function(){

  }
});

// Arbor.Views.TrailPick = Backbone.View.extend({

//   className: 'ui centered grid',

//   template: $('[data-template="trail-pick"]').text(),

//   subViews: [],

//   render: function(){

//     this.$el.html(this.template);

//     trails = trails || new Arbor.Collections.Trails()
//     var trailsList = new Arbor.Views.TrailsList({collection: trails});
//     this.subViews.push(trailsList);
//     trailsList.render();
//     this.$el.find('#trails-list-container').append(trailsList.el);

//     trails.fetch();
//   },

//   close: function(){
//     this.subViews.forEach(function(view){
//       view.close();
//     })
//     this.remove();
//   }
// })