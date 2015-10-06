var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailFilter = Arbor.Views.BaseView.extend({

  initialize: function() {
    Arbor.Views.BaseView.prototype.initialize.apply(this);

    this.render();
    this.listenTo(mapView, 'boundsChanged', this.handleBoundsChanged);
  },

  template: $('[data-template="trail-filter"]').text(),

  render: function() {
    this.$el.html(this.template);
    this.$el.find('#trail-filter-map').append(mapView.el);
  },

  handleBoundsChanged: function(bounds) {
    
    this.bounds = bounds;
    this.paramsChanged();
  
  },

  paramsChanged: function() {

  }
});