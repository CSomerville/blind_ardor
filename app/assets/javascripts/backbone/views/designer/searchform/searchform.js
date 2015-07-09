var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.SearchForm = Backbone.View.extend({

  events: {
    'change #diameter-select': 'diameter'
  },

  template: $('[data-template="search-form"]').text(),

  tagName: 'form',

  id: 'search-form',

  subViews: [],

  diameter: function(){
    this.search();
  },

  search: function(){

    // logic to include params based on whether the fields have values.
    var species = ($('#species-input').val() === '')? '' : 'species=' + $('#species-input').val() + '&';

    console.log(species);
    var bounds = mapView.getBounds();

    var url = 'api/trees/?' + species + 'n=' + bounds.n + '&s=' + bounds.s + '&e=' + bounds.e + '&w=' + bounds.w;

    treeSearchResults = treeSearchResults || new Arbor.Collections.Trees();
    treeSearchResults.url = url;
    treeSearchResults.fetch();
  },

  render: function(){
    this.$el.html(this.template)
    var speciesSelect = new Arbor.Views.SpeciesSelect()
    this.subViews.push(speciesSelect);
    speciesSelect.render();
    this.$el.prepend(speciesSelect.el)

    //listens to speciesSelect for search events (themselves triggered by typeahead events)
    speciesSelect.on('search', this.search.bind(this))
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.remove();
    });
    this.remove();
  }

})