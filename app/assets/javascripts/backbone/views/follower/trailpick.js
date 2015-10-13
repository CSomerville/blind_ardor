var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailPick = Arbor.Views.BaseView.extend({
  
  initialize: function(){
    Arbor.Views.BaseView.prototype.initialize.apply(this);

    this.collection = new Arbor.Collections.Trails();

    this.render();
    this.addListeners();

    this.collection.fetch();
  },

  className: 'ui centered grid',

  template: $('[data-template="trail-pick"]').text(),

  render: function(){

    this.$el.html(this.template);

    this.setSubView({
      name: 'trailList', 
      view: new Arbor.Views.TrailList({ collection: this.collection }) 
    });
    this.setSubView({
      name: 'trailFilter', 
      view: new Arbor.Views.TrailFilter() 
    });

    this.$el.find('#trail-list-container')
      .append(this.getSubView('trailList').el);

    this.$el.find('#trail-filter-container')
      .append(this.getSubView('trailFilter').el);
  },

  addListeners: function() {
    this.listenTo(this.getSubView('trailFilter'), 'paramsChanged', this.handleParamsChanged);
  },

  handleParamsChanged: function(bounds, species){
    var data = {};

    if ( bounds instanceof Object &&
      bounds.hasOwnProperty('n') && bounds.hasOwnProperty('s') && 
      bounds.hasOwnProperty('e') && bounds.hasOwnProperty('w')) {
      data.bounds = bounds;
    }

    if (typeof species === 'string') {
      data.species = species;
    }

    this.collection.fetch({data: data});
  }
});