var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailFilter = Arbor.Views.BaseView.extend({

  initialize: function() {
    Arbor.Views.BaseView.prototype.initialize.apply(this);

    this.species = '';

    mapView = mapView || new Arbor.Views.Map();

    this.render();

    this.listenTo(mapView, 'boundsChanged', this.handleBoundsChanged);
    this.listenTo(this.getSubView('speciesSelect'), 'search', this.handleSpeciesChanged);
  },

  events: {
    'keydown': 'handleEnter'
  },

  id: 'filter',

  template: $('[data-template="trail-filter"]').text(),

  render: function() {
    this.$el.html(this.template);
    this.$el.find('#trail-filter-map').append(mapView.el);

    this.setSubView({name: 'speciesSelect', view: new Arbor.Views.SpeciesSelect() });
    this.$el.find('#trail-filter-search')
      .append(this.getSubView('speciesSelect').el);
  },

  handleEnter: function(event) {
    if (event.keyCode === 13) {
      this.species = $('#species-input').val()
      this.paramsChanged();
    }
  },

  handleSpeciesChanged: function(species) {
    this.species = species;
    this.paramsChanged();
  },

  handleBoundsChanged: function(bounds) {
    this.bounds = bounds;
    this.paramsChanged(); 
  },

  paramsChanged: function() {
    this.trigger('paramsChanged', this.bounds, this.species);
  }
});